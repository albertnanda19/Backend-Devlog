import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateAdminUserStatusDto {
	@IsOptional()
	@IsBoolean({ message: 'isActive harus bernilai boolean.' })
	isActive?: boolean;
}


