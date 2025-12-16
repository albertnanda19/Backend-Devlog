import { Controller, Get, Param, Inject } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('UsersRepositoryToken') private readonly repo: any,
  ) {}

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const result = await this.repo.findById(id);
    return result;
  }
}
