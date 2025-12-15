import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { SupabaseModule } from './infrastructure/supabase.module';
import { ProjectModule } from './modules/project/project.module';

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
    AuthModule,
    ProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
