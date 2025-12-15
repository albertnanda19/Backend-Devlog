import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class GetProjectsQueryDto {
	@IsOptional()
	@Type(() => Number)
	@IsInt({ message: 'page harus berupa angka bulat.' })
	@Min(1, { message: 'page minimal 1.' })
	page?: number;

	@IsOptional()
	@Type(() => Number)
	@IsInt({ message: 'limit harus berupa angka bulat.' })
	@Min(1, { message: 'limit minimal 1.' })
	@Max(50, { message: 'limit maksimal 50.' })
	limit?: number;

	@IsOptional()
	@IsString({ message: 'status harus berupa teks.' })
	@IsIn(['ACTIVE', 'ARCHIVED'], { message: 'status harus bernilai ACTIVE atau ARCHIVED.' })
	status?: 'ACTIVE' | 'ARCHIVED';

	@IsOptional()
	@IsString({ message: 'search harus berupa teks.' })
	search?: string;

	@IsOptional()
	@IsString({ message: 'sortBy harus berupa teks.' })
	@IsIn(['createdAt', 'title', 'status'], { message: 'sortBy harus salah satu dari createdAt, title, status.' })
	sortBy?: 'createdAt' | 'title' | 'status';

	@IsOptional()
	@IsString({ message: 'order harus berupa teks.' })
	@IsIn(['asc', 'desc'], { message: 'order harus bernilai asc atau desc.' })
	order?: 'asc' | 'desc';
}


