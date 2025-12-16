import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UsersService } from '../../../application/services/users.service';
import { GetAdminUsersQueryDto } from './dto/get-admin-users-query.dto';
import { AdminGuard } from '../../guards/admin.guard';

@Controller('admin')
export class AdminController {
	constructor(private readonly usersService: UsersService) {}

	@UseGuards(AdminGuard)
	@Get('users')
	async list(@Query() query: GetAdminUsersQueryDto) {
		const result = await this.usersService.listUsers(query);
		return {
			success: true,
			message: 'Berhasil mengambil daftar pengguna',
			data: result.items,
			meta: {
				page: result.page,
				limit: result.limit,
				totalItems: result.total,
				totalPages: Math.ceil((result.total ?? 0) / (result.limit ?? 1)),
			},
		};
	}
}


