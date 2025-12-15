import { Controller, Get, Param, Inject, Post, Body } from '@nestjs/common';
import { AuthService } from '../../../application/services/auth.service';
import { RegisterRequestDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AuthRepositoryToken') private readonly repo: any,
    private readonly authService: AuthService,
  ) {}

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const result = await this.repo.findById(id);
    return result;
  }

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
}
