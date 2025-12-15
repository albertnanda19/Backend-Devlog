import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Matches, Max, Min } from 'class-validator';

export class GetWorklogsQueryDto {
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
	@Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'fromDate harus berformat YYYY-MM-DD.' })
	fromDate?: string;

	@IsOptional()
	@Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'toDate harus berformat YYYY-MM-DD.' })
	toDate?: string;

	@IsOptional()
	@IsIn(['asc', 'desc'], { message: 'sort harus bernilai asc atau desc.' })
	sort?: 'asc' | 'desc';
}



