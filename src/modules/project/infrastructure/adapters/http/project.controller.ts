import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, Req } from '@nestjs/common';
import type { Request } from 'express';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectService } from '../../../application/services/project.service';
import { GetProjectsQueryDto } from './dto/get-projects-query.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { GetProjectDetailQueryDto } from './dto/get-project-detail-query.dto';
import { CreateWorklogDto } from './dto/create-worklog.dto';
import { GetWorklogsQueryDto } from './dto/get-worklogs-query.dto';

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

	@Delete(':id')
	async remove(
		@Req() req: Request,
		@Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
	) {
		const auth = (req as any).user as { id: string };
		await this.projectService.deleteProject(auth.id, id);
		return {
			success: true,
			message: 'Berhasil menghapus project',
		};
	}

	@Post(':projectId/worklogs')
	async createWorklog(
		@Req() req: Request,
		@Param('projectId', new ParseUUIDPipe({ version: '4' })) projectId: string,
		@Body() body: CreateWorklogDto,
	) {
		const auth = (req as any).user as { id: string };
		const wl = await this.projectService.createWorklog(auth.id, projectId, body);
		return {
			success: true,
			message: 'Worklog created successfully',
			data: {
				id: wl.id,
				logDate: wl.log_date,
				activityType: wl.activity_type,
				summary: wl.summary,
				timeSpent: wl.time_spent,
				blockers: wl.blockers,
				createdAt: wl.created_at,
			},
		};
	}

	@Get(':projectId/worklogs')
	async listWorklogs(
		@Req() req: Request,
		@Param('projectId', new ParseUUIDPipe({ version: '4' })) projectId: string,
		@Query() query: GetWorklogsQueryDto,
	) {
		const auth = (req as any).user as { id: string };
		const result = await this.projectService.listWorklogs(auth.id, projectId, query);
		return {
			success: true,
			message: 'Berhasil mengambil worklog',
			data: result.items.map((w: any) => ({
				id: w.id,
				logDate: w.log_date,
				activityType: w.activity_type,
				summary: w.summary,
				timeSpent: w.time_spent,
				blockers: w.blockers,
				createdAt: w.created_at,
			})),
			meta: result.meta,
		};
	}

	@Get(':projectId/worklogs/:id')
	async getWorklogDetail(
		@Req() req: Request,
		@Param('projectId', new ParseUUIDPipe({ version: '4' })) projectId: string,
		@Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
	) {
		const auth = (req as any).user as { id: string };
		const detail = await this.projectService.getWorklogDetail(auth.id, projectId, id);
		return {
			success: true,
			message: 'Berhasil mengambil worklog',
			data: detail,
		};
	}
}

 
