import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProjectController } from './infrastructure/adapters/http/project.controller';
import { ProjectsAdminController } from './infrastructure/adapters/http/projects.admin.controller';
import { ProjectRepositoryImpl } from './infrastructure/adapters/persistence/project.repository.impl';
import { ProjectService } from './application/services/project.service';
import { SupabaseModule } from '../../infrastructure/supabase.module';
import { AccessTokenMiddleware } from '../../middleware/access-token.middleware';
import { AdminGuard } from '../users/infrastructure/guards/admin.guard';

@Module({
  imports: [SupabaseModule],
  controllers: [ProjectController, ProjectsAdminController],
  providers: [
    ProjectRepositoryImpl,
    {
      provide: 'ProjectRepositoryToken',
      useClass: ProjectRepositoryImpl,
    },
    ProjectService,
    AdminGuard,
  ],
  exports: ['ProjectRepositoryToken'],
})
export class ProjectModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AccessTokenMiddleware).forRoutes('projects', 'admin');
  }
}
