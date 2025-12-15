import { Injectable, BadRequestException, InternalServerErrorException, Inject } from '@nestjs/common';
import { TokenServicePort } from '../ports/token-service.port';
import { UserRepositoryPort } from '../ports/user.repository.port';
import { createHash, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

function hashPassword(plain: string): string {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = scryptSync(plain, salt, 64);
  return `${salt}:${derivedKey.toString('hex')}`;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject('TokenServicePort') private readonly tokenService: TokenServicePort,
    @Inject('UserRepositoryPort') private readonly userRepo: UserRepositoryPort,
  ) {}

  async register(email: string, password: string, full_name: string) {
    const existing = await this.userRepo.findByEmail(email);
    if (existing) {
      throw new BadRequestException('Email sudah terdaftar');
    }

    const roleId = await this.userRepo.getDefaultRoleId();
    if (!roleId) {
      throw new InternalServerErrorException('Peran default tidak terkonfigurasi');
    }

    const passwordHash = hashPassword(password);
    const user = await this.userRepo.createUser({
      email,
      password_hash: passwordHash,
      role_id: roleId,
      full_name,
    });

    const accessToken = this.tokenService.signAccessToken({
      sub: user.id,
      type: 'access',
      email: user.email,
      roles_id: [user.role_id],
    } as any);
    const refreshToken = this.tokenService.signRefreshToken({
      sub: user.id,
      type: 'refresh',
    } as any);

    return { accessToken, refreshToken };
  }
}


