import { Type } from 'class-transformer';
import { IsBoolean, IsIn, IsInt, IsOptional, IsString, IsUUID, Max, Min, MinLength } from 'class-validator';

export class GetAdminProjectsQueryDto {
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
	@IsString({ message: 'status harus berupa teks.' })
	@IsIn(['ACTIVE', 'ARCHIVED'], { message: 'status harus bernilai ACTIVE atau ARCHIVED.' })
	status?: 'ACTIVE' | 'ARCHIVED';

	@IsOptional()
	@IsString({ message: 'search harus berupa teks.' })
	@MinLength(2, { message: 'search minimal 2 karakter.' })
	search?: string;

	@IsOptional()
	@Type(() => Boolean)
	@IsBoolean({ message: 'includeDeleted harus bernilai boolean.' })
	includeDeleted?: boolean;

	@IsOptional()
	@IsIn(['asc', 'desc'], { message: 'sort harus bernilai asc atau desc.' })
	sort?: 'asc' | 'desc';
}


