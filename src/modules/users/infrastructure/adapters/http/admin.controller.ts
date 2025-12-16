import { Controller, Get, Param, ParseUUIDPipe, Query, UseGuards } from '@nestjs/common';
import { UsersService } from '../../../application/services/users.service';
import { GetAdminUsersQueryDto } from './dto/get-admin-users-query.dto';
import { AdminGuard } from '../../guards/admin.guard';
import { GetAdminUserDetailQueryDto } from './dto/get-admin-user-detail-query.dto';

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

	@UseGuards(AdminGuard)
	@Get('users/:id')
	async detail(
		@Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
		@Query() query: GetAdminUserDetailQueryDto,
	) {
		const data = await this.usersService.getUserDetail(id, query);
		return {
			success: true,
			message: 'Berhasil mengambil detail pengguna',
			data,
		};
	}
}


