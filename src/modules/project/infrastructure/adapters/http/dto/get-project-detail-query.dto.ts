import { Type } from 'class-transformer';
import { IsBoolean, IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';

export class GetProjectDetailQueryDto {
	@IsOptional()
	@Type(() => Boolean)
	@IsBoolean({ message: 'includeWorklogs harus berupa boolean.' })
	includeWorklogs?: boolean;

	@IsOptional()
	@Type(() => Number)
	@IsInt({ message: 'worklogLimit harus berupa angka bulat.' })
	@Min(1, { message: 'worklogLimit minimal 1.' })
	@Max(50, { message: 'worklogLimit maksimal 50.' })
	worklogLimit?: number;

	@IsOptional()
	@IsIn(['asc', 'desc'], { message: 'worklogOrder harus bernilai asc atau desc.' })
	worklogOrder?: 'asc' | 'desc';
}


