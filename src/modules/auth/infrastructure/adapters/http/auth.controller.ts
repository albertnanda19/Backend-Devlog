import { Controller, Get, Param, Inject, Post, Body, ParseUUIDPipe } from '@nestjs/common';
import { AuthService } from '../../../application/services/auth.service';
import { RegisterRequestDto } from './dto/register.dto';
import { LoginRequestDto } from './dto/login.dto';
import { Req } from '@nestjs/common';
import type { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AuthRepositoryToken') private readonly repo: any,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() body: RegisterRequestDto) {
    const { accessToken, refreshToken } = await this.authService.register(
      body.email,
      body.password,
      body.full_name,
    );
    return {
      success: true,
      message: 'Registrasi berhasil.',
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  @Post('login')
  async login(@Body() body: LoginRequestDto) {
    const { accessToken, refreshToken } = await this.authService.login(
      body.email,
      body.password,
    );
    return {
      success: true,
      message: 'Login berhasil.',
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  @Get('me')
  async me(@Req() req: Request) {
    const auth = (req as any).user as { id: string };
    const profile = await this.repo.findById(auth.id);
    return {
      success: true,
      data: {
        id: profile?.id,
        email: profile?.email,
        fullName: profile?.full_name ?? null,
        role: profile?.roles
          ? { id: profile.roles.id ?? null, name: profile.roles.name ?? null }
          : null,
        isActive: profile?.is_active ?? null,
        createdAt: profile?.created_at ?? null,
      },
    };
  }

  @Get(':id')
  async getOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const result = await this.repo.findById(id);
    return result;
  }
}
