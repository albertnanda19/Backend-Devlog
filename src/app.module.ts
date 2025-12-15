import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { createClient } from '@supabase/supabase-js';
import { ConfigModule } from '@nestjs/config';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ 
  connectionString: process.env.DATABASE_URL 
});
const prisma = new PrismaClient({ adapter });

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
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'SUPABASE_CLIENT',
      useFactory: () =>
        createClient(
          process.env.SUPABASE_URL as string,
          process.env.SUPABASE_SERVICE_ROLE_KEY as string,
        ),
    },
  ],
})
export class AppModule {}
