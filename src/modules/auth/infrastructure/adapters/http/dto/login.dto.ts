import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginRequestDto {
	@IsNotEmpty({ message: 'Email wajib diisi.' })
	@IsEmail({}, { message: 'Format email tidak valid.' })
	email!: string;

	@IsNotEmpty({ message: 'Kata sandi wajib diisi.' })
	@IsString({ message: 'Kata sandi harus berupa teks.' })
	@MinLength(6, { message: 'Kata sandi minimal 6 karakter.' })
	password!: string;
}


