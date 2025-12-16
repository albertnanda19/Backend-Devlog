export type CreateUserInput = {
	email: string;
	password_hash: string;
	role_id: string;
	full_name?: string | null;
};

export type UserRecord = {
	id: string;
	email: string;
	password_hash: string;
	role_id: string;
	full_name?: string | null;
	is_active: boolean;
	created_at: Date;
	updated_at: Date;
};

export abstract class UserRepositoryPort {
	abstract findByEmail(email: string): Promise<UserRecord | null>;
	abstract createUser(data: CreateUserInput): Promise<UserRecord>;
	abstract getDefaultRoleId(): Promise<string>;
	abstract getById(id: string): Promise<UserRecord | null>;
	abstract updateFullName(id: string, full_name: string): Promise<UserRecord>;
	abstract getRoleById(roleId: string): Promise<{ id: string; name: string } | null>;
}


