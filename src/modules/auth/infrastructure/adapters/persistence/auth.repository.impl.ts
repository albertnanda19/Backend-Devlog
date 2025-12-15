import { Injectable, Inject, InternalServerErrorException } from '@nestjs/common';
import { AuthRepository } from '../../../domain/repositories/auth.repository';
import { UserRepositoryPort, CreateUserInput, UserRecord } from '../../../application/ports/user.repository.port';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class AuthRepositoryImpl implements AuthRepository, UserRepositoryPort {
	constructor(
		@Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
	) {}

	async findById(id: string): Promise<any> {
		const { data, error } = await this.supabase
			.from('users')
			.select('id,email,full_name,created_at')
			.eq('id', id)
			.maybeSingle();
		if (error) {
			throw new InternalServerErrorException('Gagal mengambil data pengguna');
		}
		return data ?? null;
	}

	async findByEmail(email: string): Promise<UserRecord | null> {
		const { data, error } = await this.supabase
			.from('users')
			.select('id,email,password_hash,role_id,full_name,is_active,created_at,updated_at')
			.eq('email', email)
			.maybeSingle();
		if (error) {
			throw new InternalServerErrorException('Gagal memeriksa email pengguna');
		}
		return (data as UserRecord) ?? null;
	}

	async createUser(data: CreateUserInput): Promise<UserRecord> {
		const { data: inserted, error } = await this.supabase
			.from('users')
			.insert({
				email: data.email,
				password_hash: data.password_hash,
				role_id: data.role_id,
				full_name: data.full_name ?? null,
			})
			.select('id,email,password_hash,role_id,full_name,is_active,created_at,updated_at')
			.single();
		if (error) {
			throw new InternalServerErrorException('Gagal membuat pengguna baru');
		}
		return inserted as UserRecord;
	}

	async getDefaultRoleId(): Promise<string> {
		const fromEnv = process.env.DEFAULT_ROLE_ID;
		if (fromEnv) return fromEnv;

		const { data: role, error: findErr } = await this.supabase
			.from('roles')
			.select('id,name')
			.eq('name', 'USER')
			.maybeSingle();
		if (findErr) {
			throw new InternalServerErrorException('Gagal mengambil peran default');
		}
		if (role?.id) return role.id as string;

		const { data: created, error: insertErr } = await this.supabase
			.from('roles')
			.insert({ name: 'USER', description: 'Default application role' })
			.select('id')
			.single();
		if (insertErr || !created) {
			throw new InternalServerErrorException('Gagal membuat peran default');
		}
		return created.id as string;
	}
}
