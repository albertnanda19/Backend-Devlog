import { Type } from 'class-transformer';
import { IsBoolean, IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class GetAdminUsersQueryDto {
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
	@IsString({ message: 'role harus berupa teks.' })
	@IsIn(['ADMIN', 'USER'], { message: 'role harus bernilai ADMIN atau USER.' })
	role?: 'ADMIN' | 'USER';

	@IsOptional()
	@Type(() => Boolean)
	@IsBoolean({ message: 'isActive harus bernilai boolean.' })
	isActive?: boolean;

	@IsOptional()
	@IsString({ message: 'search harus berupa teks.' })
	search?: string;

	@IsOptional()
	@IsString({ message: 'sortBy harus berupa teks.' })
	@IsIn(['createdAt', 'email', 'fullName'], { message: 'sortBy harus salah satu dari createdAt, email, fullName.' })
	sortBy?: 'createdAt' | 'email' | 'fullName';

	@IsOptional()
	@IsString({ message: 'order harus berupa teks.' })
	@IsIn(['asc', 'desc'], { message: 'order harus bernilai asc atau desc.' })
	order?: 'asc' | 'desc';
}


