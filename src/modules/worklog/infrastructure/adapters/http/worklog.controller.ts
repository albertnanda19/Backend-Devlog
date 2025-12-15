import { Controller, Get, Param, Inject } from '@nestjs/common';

@Controller('worklog')
export class WorklogController {
  constructor(
    @Inject('WorklogRepositoryToken') private readonly repo: any,
  ) {}

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const result = await this.repo.findById(id);
    return result;
  }
}
