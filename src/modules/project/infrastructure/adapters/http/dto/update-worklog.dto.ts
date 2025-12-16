import { IsInt, IsOptional, IsString, Matches, MaxLength, Min, MinLength } from 'class-validator';

export class UpdateWorklogDto {
	@IsOptional()
	@Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'Format tanggal harus YYYY-MM-DD.' })
	logDate?: string;

	@IsOptional()
	@IsString({ message: 'Jenis aktivitas harus berupa teks.' })
	@MaxLength(50, { message: 'Jenis aktivitas maksimal 50 karakter.' })
	activityType?: string;

	@IsOptional()
	@IsString({ message: 'Ringkasan aktivitas harus berupa teks.' })
	@MinLength(10, { message: 'Ringkasan aktivitas minimal 10 karakter.' })
	summary?: string;

	@IsOptional()
	@IsInt({ message: 'Waktu yang dihabiskan harus berupa angka menit.' })
	@Min(0, { message: 'Waktu yang dihabiskan minimal 0 menit.' })
	timeSpent?: number;

	@IsOptional()
	@IsString({ message: 'Blocker harus berupa teks.' })
	blockers?: string;
}


