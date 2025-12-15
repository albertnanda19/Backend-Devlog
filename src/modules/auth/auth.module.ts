import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AuthController } from './infrastructure/adapters/http/auth.controller';
import { AuthRepositoryImpl } from './infrastructure/adapters/persistence/auth.repository.impl';
import { AuthService } from './application/services/auth.service';
import { TokenServiceAdapter } from './infrastructure/adapters/token-service.adapter';
import { SupabaseModule } from '../../infrastructure/supabase.module';
import { AccessTokenMiddleware } from '../../middleware/access-token.middleware';

@Module({
  imports: [SupabaseModule],
  controllers: [AuthController],
  providers: [
    AuthRepositoryImpl,
    {
      provide: 'AuthRepositoryToken',
      useClass: AuthRepositoryImpl,
    },
    {
      provide: 'UserRepositoryPort',
      useClass: AuthRepositoryImpl,
    },
    {
      provide: 'TokenServicePort',
      useClass: TokenServiceAdapter,
    },
    AuthService,
  ],
  exports: ['AuthRepositoryToken'],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AccessTokenMiddleware).forRoutes('auth/me');
  }
}
