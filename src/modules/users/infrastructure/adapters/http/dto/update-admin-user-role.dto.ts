import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateAdminUserRoleDto {
	@IsNotEmpty({ message: 'roleId wajib diisi.' })
	@IsString({ message: 'roleId harus berupa teks.' })
	@IsUUID('4', { message: 'roleId harus berupa UUID v4 yang valid.' })
	roleId!: string;
}


