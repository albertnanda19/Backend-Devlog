import { Injectable } from '@nestjs/common';
import { TokenServicePort, AccessTokenPayload, RefreshTokenPayload } from '../../application/ports/token-service.port';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as fs from 'node:fs';
import * as path from 'node:path';

function readKeyFile(envKey: string, fallback: string): string {
  const configured = process.env[envKey];
  const filePath = configured && configured.trim().length > 0 ? configured : fallback;
  const absPath = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
  return fs.readFileSync(absPath, 'utf8');
}

@Injectable()
export class TokenServiceAdapter implements TokenServicePort {
  private readonly jwtService: JwtService;
  private readonly accessTtlSec: number;
  private readonly refreshTtlSec: number;

  constructor() {
    const privateKey = readKeyFile('PRIVATE_KEY_PATH', 'private_key.pem');
    const publicKey = readKeyFile('PUBLIC_KEY_PATH', 'public_key.pem');
    this.jwtService = new JwtService({
      privateKey,
      publicKey,
      signOptions: { algorithm: 'RS256' } as JwtSignOptions,
    });
    this.accessTtlSec = Number(process.env.ACCESS_TOKEN_TTL_SECONDS ?? 1800); // 30 min
    this.refreshTtlSec = Number(process.env.REFRESH_TOKEN_TTL_SECONDS ?? 60 * 60 * 24 * 7); // 7 days
  }

  signAccessToken(base: Omit<AccessTokenPayload, 'iat' | 'exp'>): string {
    const nowSec = Math.floor(Date.now() / 1000);
    const payload: AccessTokenPayload = {
      ...base,
      iat: nowSec,
      exp: nowSec + this.accessTtlSec,
    };
    return this.jwtService.sign(payload as Record<string, unknown>, { algorithm: 'RS256' });
  }

  signRefreshToken(base: Omit<RefreshTokenPayload, 'iat' | 'exp'>): string {
    const nowSec = Math.floor(Date.now() / 1000);
    const payload: RefreshTokenPayload = {
      ...base,
      iat: nowSec,
      exp: nowSec + this.refreshTtlSec,
    };
    return this.jwtService.sign(payload as Record<string, unknown>, { algorithm: 'RS256' });
  }
}


