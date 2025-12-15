import { Injectable, NestMiddleware, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { Request, Response, NextFunction } from 'express';

function readKeyFile(envKey: string, fallback: string): string {
	const configured = process.env[envKey];
	const filePath = configured && configured.trim().length > 0 ? configured : fallback;
	const absPath = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
	return fs.readFileSync(absPath, 'utf8');
}

@Injectable()
export class AccessTokenMiddleware implements NestMiddleware {
	private readonly jwt: JwtService;

	constructor() {
		const publicKey = readKeyFile('PUBLIC_KEY_PATH', 'public_key.pem');
		this.jwt = new JwtService({ publicKey });
	}

	use(req: Request, _res: Response, next: NextFunction) {
		const header = req.headers['authorization'];
		if (!header || typeof header !== 'string' || !header.startsWith('Bearer ')) {
			throw new UnauthorizedException('Token otorisasi tidak ditemukan atau tidak valid');
		}
		const token = header.substring('Bearer '.length).trim();
		if (!token) {
			throw new UnauthorizedException('Token otorisasi tidak ditemukan atau tidak valid');
		}
		try {
			const payload = this.jwt.verify(token, {
				algorithms: ['RS256'],
				ignoreExpiration: false,
			} as JwtVerifyOptions) as Record<string, unknown>;

			if (payload['type'] !== 'access') {
				throw new ForbiddenException('Token bukan access token yang valid');
			}
			if (!payload['sub'] || typeof payload['sub'] !== 'string') {
				throw new UnauthorizedException('Token tidak memiliki subject yang valid');
			}

			(req as any).user = {
				id: payload['sub'],
				email: payload['email'],
				roles_id: payload['roles_id'],
			};
			return next();
		} catch (e) {
			if (e instanceof UnauthorizedException || e instanceof ForbiddenException) {
				throw e;
			}
			throw new UnauthorizedException('Token tidak valid atau telah kedaluwarsa');
		}
	}
}


