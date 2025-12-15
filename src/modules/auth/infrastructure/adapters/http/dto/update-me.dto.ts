import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateMeDto {
	@IsNotEmpty({ message: 'Nama lengkap wajib diisi.' })
	@IsString({ message: 'Nama lengkap harus berupa teks.' })
	@MaxLength(100, { message: 'Nama lengkap maksimal 100 karakter.' })
	full_name!: string;
}


