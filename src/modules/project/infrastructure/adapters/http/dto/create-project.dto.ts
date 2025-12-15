import { IsIn, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateProjectDto {
	@IsNotEmpty({ message: 'Judul proyek wajib diisi.' })
	@IsString({ message: 'Judul proyek harus berupa teks.' })
	@MinLength(3, { message: 'Judul proyek minimal 3 karakter.' })
	@MaxLength(150, { message: 'Judul proyek maksimal 150 karakter.' })
	title!: string;

	@IsOptional()
	@IsString({ message: 'Deskripsi harus berupa teks.' })
	description?: string;

	@IsOptional()
	@IsString({ message: 'Tech stack harus berupa teks.' })
	techStack?: string;

	@IsOptional()
	@IsString({ message: 'Status harus berupa teks.' })
	@IsIn(['ACTIVE', 'ARCHIVED'], { message: 'Status harus bernilai ACTIVE atau ARCHIVED.' })
	status?: 'ACTIVE' | 'ARCHIVED';
}


