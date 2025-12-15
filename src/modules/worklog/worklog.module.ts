import { Module } from '@nestjs/common';
import { WorklogController } from './infrastructure/adapters/http/worklog.controller';
import { WorklogRepositoryImpl } from './infrastructure/adapters/persistence/worklog.repository.impl';

@Module({
  controllers: [WorklogController],
  providers: [
    WorklogRepositoryImpl,
    {
      provide: 'WorklogRepositoryToken',
      useClass: WorklogRepositoryImpl,
    },
  ],
  exports: ['WorklogRepositoryToken'],
})
export class WorklogModule {}
