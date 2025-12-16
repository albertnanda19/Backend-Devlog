import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { GetAuditLogsQueryDto } from './dto/get-audit-logs-query.dto';
import { AuditLogsService } from '../../../application/services/audit-logs.service';
import { AdminGuard } from '../../../../users/infrastructure/guards/admin.guard';

@Controller('admin')
export class AuditLogsController {
	constructor(private readonly service: AuditLogsService) {}

	@UseGuards(AdminGuard)
	@Get('audit-logs')
	async list(@Query() query: GetAuditLogsQueryDto) {
		// Validate date range (from <= to) at controller level as extra guard
		if (query.from && query.to && new Date(query.from) > new Date(query.to)) {
			return {
				success: false,
				message: 'Rentang tanggal tidak valid (from harus ≤ to).',
			};
		}
		const result = await this.service.list(query);
		return {
			success: true,
			message: 'Berhasil mengambil audit logs',
			data: result.items,
			meta: result.meta,
		};
	}
}

 
