import { Controller, Get, Param, ParseUUIDPipe, Req } from '@nestjs/common';
import type { Request } from 'express';
import { WorklogService } from '../../../application/services/worklog.service';

@Controller('worklogs')
export class WorklogController {
	constructor(private readonly worklogService: WorklogService) {}

	@Get(':id')
	async getOne(
		@Req() req: Request,
		@Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
	) {
		const auth = (req as any).user as { id: string };
		const detail = await this.worklogService.getWorklogDetail(auth.id, id);
		return {
			success: true,
			data: detail,
		};
	}
}

 
