import { Module } from '@nestjs/common';
import { AuthController } from './infrastructure/adapters/http/auth.controller';
import { AuthRepositoryImpl } from './infrastructure/adapters/persistence/auth.repository.impl';

@Module({
  controllers: [AuthController],
  providers: [
    AuthRepositoryImpl,
    {
      provide: 'AuthRepositoryToken',
      useClass: AuthRepositoryImpl,
    },
  ],
  exports: ['AuthRepositoryToken'],
})
export class AuthModule {}
