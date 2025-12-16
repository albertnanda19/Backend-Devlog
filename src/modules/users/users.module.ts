import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AdminController } from './infrastructure/adapters/http/admin.controller';
import { UsersRepositoryImpl } from './infrastructure/adapters/persistence/users.repository.impl';
import { UsersService } from './application/services/users.service';
import { SupabaseModule } from '../../infrastructure/supabase.module';
import { AccessTokenMiddleware } from '../../middleware/access-token.middleware';
import { AdminGuard } from './infrastructure/guards/admin.guard';
import { RolesController } from './infrastructure/adapters/http/roles.controller';

@Module({
  imports: [SupabaseModule],
  controllers: [AdminController, RolesController],
  providers: [
    UsersRepositoryImpl,
    {
      provide: 'UsersRepositoryToken',
      useClass: UsersRepositoryImpl,
    },
    UsersService,
    AdminGuard,
  ],
  exports: ['UsersRepositoryToken'],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AccessTokenMiddleware).forRoutes('admin');
  }
}
