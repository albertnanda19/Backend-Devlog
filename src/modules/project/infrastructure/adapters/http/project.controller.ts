import { Body, Controller, Post, Req } from '@nestjs/common';
import type { Request } from 'express';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectService } from '../../../application/services/project.service';

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
			message: 'Project created successfully',
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
}

 
