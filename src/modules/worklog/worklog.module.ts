import { Module } from '@nestjs/common';
import { WorklogRepositoryImpl } from './infrastructure/adapters/persistence/worklog.repository.impl';
import { WorklogService } from './application/services/worklog.service';
import { SupabaseModule } from '../../infrastructure/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [],
  providers: [
    WorklogRepositoryImpl,
    {
      provide: 'WorklogRepositoryToken',
      useClass: WorklogRepositoryImpl,
    },
    WorklogService,
  ],
  exports: ['WorklogRepositoryToken'],
})
export class WorklogModule {}
