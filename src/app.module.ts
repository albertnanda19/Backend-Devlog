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
      envFilePath: (() => {
        const ev = process.env.NODE_ENV
          ? process.env.NODE_ENV
          : process.env.npm_lifecycle_event === 'start:dev'
            ? 'development'
            : process.env.npm_lifecycle_event === 'start:prod'
              ? 'production'
              : undefined;
        return ev ? [`.env.${ev}.local`] : [];
      })(),
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
