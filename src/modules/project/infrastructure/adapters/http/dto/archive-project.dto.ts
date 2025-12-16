import { IsOptional, IsString, MaxLength } from 'class-validator';

export class ArchiveProjectDto {
	@IsOptional()
	@IsString({ message: 'Alasan harus berupa teks.' })
	@MaxLength(255, { message: 'Alasan maksimal 255 karakter.' })
	reason?: string;
}


