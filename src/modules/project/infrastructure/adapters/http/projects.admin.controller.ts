import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { GetAdminProjectsQueryDto } from './dto/get-admin-projects-query.dto';
import { ProjectService } from '../../../application/services/project.service';
import { AdminGuard } from '../../../../users/infrastructure/guards/admin.guard';

@Controller('admin')
export class ProjectsAdminController {
	constructor(private readonly projectService: ProjectService) {}

	@UseGuards(AdminGuard)
	@Get('projects')
	async list(@Query() query: GetAdminProjectsQueryDto) {
		const result = await this.projectService.adminListProjects(query);
		return {
			success: true,
			message: 'Berhasil mengambil daftar project',
			data: result.items,
			meta: result.meta,
		};
	}
}


