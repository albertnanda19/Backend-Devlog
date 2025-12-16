import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { SupabaseModule } from './infrastructure/supabase.module';
import { ProjectModule } from './modules/project/project.module';
import { AuditLoggerModule } from './infrastructure/logger/audit-logger.module';
import { WorklogModule } from './modules/worklog/worklog.module';
import { UsersModule } from './modules/users/users.module';
import { AuditLogsModule } from './modules/audit-logs/audit-logs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SupabaseModule,
    AuditLoggerModule,
    AuthModule,
    ProjectModule,
    WorklogModule,
    UsersModule,
    AuditLogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
