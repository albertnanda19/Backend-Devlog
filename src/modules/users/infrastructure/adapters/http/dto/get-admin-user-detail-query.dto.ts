import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, Max, Min } from 'class-validator';

export class GetAdminUserDetailQueryDto {
	@IsOptional()
	@Type(() => Boolean)
	@IsBoolean({ message: 'includeStats harus bernilai boolean.' })
	includeStats?: boolean;

	@IsOptional()
	@Type(() => Boolean)
	@IsBoolean({ message: 'includeProjects harus bernilai boolean.' })
	includeProjects?: boolean;

	@IsOptional()
	@Type(() => Number)
	@IsInt({ message: 'projectLimit harus berupa angka bulat.' })
	@Min(1, { message: 'projectLimit minimal 1.' })
	@Max(20, { message: 'projectLimit maksimal 20.' })
	projectLimit?: number;
}


