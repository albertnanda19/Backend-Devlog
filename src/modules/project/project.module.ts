import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProjectController } from './infrastructure/adapters/http/project.controller';
import { ProjectRepositoryImpl } from './infrastructure/adapters/persistence/project.repository.impl';
import { ProjectService } from './application/services/project.service';
import { SupabaseModule } from '../../infrastructure/supabase.module';
import { AccessTokenMiddleware } from '../../middleware/access-token.middleware';

@Module({
  imports: [SupabaseModule],
  controllers: [ProjectController],
  providers: [
    ProjectRepositoryImpl,
    {
      provide: 'ProjectRepositoryToken',
      useClass: ProjectRepositoryImpl,
    },
    ProjectService,
  ],
  exports: ['ProjectRepositoryToken'],
})
export class ProjectModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AccessTokenMiddleware).forRoutes('projects');
  }
}
