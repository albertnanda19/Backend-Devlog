import { Controller, Get, Param, Inject } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AuthRepositoryToken') private readonly repo: any,
  ) {}

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const result = await this.repo.findById(id);
    return result;
  }
}
