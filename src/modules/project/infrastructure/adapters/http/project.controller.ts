import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put, Query, Req } from '@nestjs/common';
import type { Request } from 'express';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectService } from '../../../application/services/project.service';
import { GetProjectsQueryDto } from './dto/get-projects-query.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { GetProjectDetailQueryDto } from './dto/get-project-detail-query.dto';

@Controller('projects')
export class ProjectController {
	constructor(
		private readonly projectService: ProjectService,
	) {}

	@Post()
	async create(@Req() req: Request, @Body() body: CreateProjectDto) {
		const auth = (req as any).user as { id: string };
		const project = await this.projectService.createProject(auth.id, body);
		return {
			success: true,
			message: 'Berhasil membuat project',
			data: {
				id: project.id,
				title: project.title,
				description: project.description ?? null,
				techStack: project.tech_stack ?? null,
				status: project.status,
				createdAt: project.created_at,
			},
		};
	}

	@Get()
	async list(@Req() req: Request, @Query() query: GetProjectsQueryDto) {
		const auth = (req as any).user as { id: string };
		const result = await this.projectService.listProjects(auth.id, query);
		return {
			success: true,
			message: 'Berhasil mengambil project',
			data: result.items.map((p: any) => ({
				id: p.id,
				title: p.title,
				description: p.description ?? null,
				techStack: p.tech_stack ?? null,
				status: p.status,
				createdAt: p.created_at,
			})),
			meta: result.meta,
		};
	}

	@Put(':id')
	async update(
		@Req() req: Request,
		@Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
		@Body() body: UpdateProjectDto,
	) {
		const auth = (req as any).user as { id: string };
		const updated = await this.projectService.updateProject(auth.id, id, body);
		return {
			success: true,
			message: 'Berhasil memperbarui project',
			data: {
				id: updated.id,
				title: updated.title,
				description: updated.description ?? null,
				techStack: updated.tech_stack ?? null,
				status: updated.status,
				updatedAt: updated.updated_at,
			},
		};
	}

	@Get(':id')
	async getOne(
		@Req() req: Request,
		@Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
		@Query() query: GetProjectDetailQueryDto,
	) {
		const auth = (req as any).user as { id: string };
		const detail = await this.projectService.getProjectDetail(auth.id, id, query);
		const { worklogs, ...rest } = detail;
		return {
			success: true,
			data: worklogs
				? { ...rest, worklogs }
				: rest,
		};
	}
}

 
