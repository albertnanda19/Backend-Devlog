import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SupabaseModule } from '../../infrastructure/supabase.module';
import { AccessTokenMiddleware } from '../../middleware/access-token.middleware';
import { AdminGuard } from '../users/infrastructure/guards/admin.guard';
import { AuditLogsController } from './infrastructure/adapters/http/audit-logs.controller';
import { AuditLogsRepositoryImpl } from './infrastructure/adapters/persistence/audit-logs.repository.impl';
import { AuditLogsService } from './application/services/audit-logs.service';

@Module({
  imports: [SupabaseModule],
  controllers: [AuditLogsController],
  providers: [
    AuditLogsRepositoryImpl,
    {
      provide: 'AuditLogsRepositoryToken',
      useClass: AuditLogsRepositoryImpl,
    },
    AuditLogsService,
    AdminGuard,
  ],
  exports: ['AuditLogsRepositoryToken'],
})
export class AuditLogsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AccessTokenMiddleware).forRoutes('admin');
  }
}
