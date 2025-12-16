import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query, Req, UseGuards } from '@nestjs/common';
import { GetAdminProjectsQueryDto } from './dto/get-admin-projects-query.dto';
import { ProjectService } from '../../../application/services/project.service';
import { AdminGuard } from '../../../../users/infrastructure/guards/admin.guard';
import { ArchiveProjectDto } from './dto/archive-project.dto';
import type { Request } from 'express';

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

	@UseGuards(AdminGuard)
	@Post('projects/:id/archive')
	async archive(
		@Req() req: Request,
		@Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
		@Body() body: ArchiveProjectDto,
	) {
		const actor = (req as any).user as { id: string };
		const archived = await this.projectService.adminArchiveProject(actor.id, id, body.reason);
		return {
			success: true,
			message: 'Project berhasil di arsip',
			data: archived,
		};
	}

	@UseGuards(AdminGuard)
	@Post('projects/:id/restore')
	async restore(
		@Req() req: Request,
		@Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
	) {
		const actor = (req as any).user as { id: string };
		const restored = await this.projectService.adminRestoreProject(actor.id, id);
		return {
			success: true,
			message: 'Project restored successfully',
			data: restored,
		};
	}
}


