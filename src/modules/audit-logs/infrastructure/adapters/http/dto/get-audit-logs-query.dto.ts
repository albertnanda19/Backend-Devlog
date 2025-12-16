import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';

export class GetAuditLogsQueryDto {
	@IsOptional()
	@Type(() => Number)
	@IsInt({ message: 'page harus berupa angka bulat.' })
	@Min(1, { message: 'page minimal 1.' })
	page?: number;

	@IsOptional()
	@Type(() => Number)
	@IsInt({ message: 'limit harus berupa angka bulat.' })
	@Min(1, { message: 'limit minimal 1.' })
	@Max(100, { message: 'limit maksimal 100.' })
	limit?: number;

	@IsOptional()
	@IsUUID('4', { message: 'userId harus berupa UUID v4 yang valid.' })
	userId?: string;

	@IsOptional()
	@IsString({ message: 'entityType harus berupa teks.' })
	@IsIn(['USER', 'PROJECT', 'WORKLOG'], { message: 'entityType harus USER, PROJECT, atau WORKLOG.' })
	entityType?: 'USER' | 'PROJECT' | 'WORKLOG';

	@IsOptional()
	@IsUUID('4', { message: 'entityId harus berupa UUID v4 yang valid.' })
	entityId?: string;

	@IsOptional()
	@IsString({ message: 'action harus berupa teks.' })
	@IsIn(['UPDATE_USER_ROLE', 'DELETE_PROJECT', 'CREATE_WORKLOG', 'UPDATE_WORKLOG', 'DELETE_WORKLOG', 'CREATE_PROJECT', 'UPDATE_PROJECT', 'DELETE_USER'], { message: 'action tidak valid.' })
	action?: string;

	@IsOptional()
	@IsString({ message: 'from harus berupa ISO date string.' })
	from?: string;

	@IsOptional()
	@IsString({ message: 'to harus berupa ISO date string.' })
	to?: string;

	@IsOptional()
	@IsIn(['asc', 'desc'], { message: 'sort harus bernilai asc atau desc.' })
	sort?: 'asc' | 'desc';
}


