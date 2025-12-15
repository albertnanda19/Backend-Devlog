import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class RegisterRequestDto {
	@IsNotEmpty({ message: 'Email wajib diisi.' })
	@IsEmail({}, { message: 'Format email tidak valid.' })
	email!: string;

	@IsNotEmpty({ message: 'Kata sandi wajib diisi.' })
	@IsString({ message: 'Kata sandi harus berupa teks.' })
	@MinLength(6, { message: 'Kata sandi minimal 6 karakter.' })
	password!: string;

	@IsNotEmpty({ message: 'Nama lengkap wajib diisi.' })
	@IsString({ message: 'Nama lengkap harus berupa teks.' })
	@MaxLength(100, { message: 'Nama lengkap maksimal 100 karakter.' })
	full_name!: string;
}


