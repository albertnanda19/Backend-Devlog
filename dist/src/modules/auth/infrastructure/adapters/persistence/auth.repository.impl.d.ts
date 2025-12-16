import { AuthRepository } from '../../../domain/repositories/auth.repository';
import { UserRepositoryPort, CreateUserInput, UserRecord } from '../../../application/ports/user.repository.port';
import { SupabaseClient } from '@supabase/supabase-js';
export declare class AuthRepositoryImpl implements AuthRepository, UserRepositoryPort {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    findById(id: string): Promise<any>;
    findByEmail(email: string): Promise<UserRecord | null>;
    createUser(data: CreateUserInput): Promise<UserRecord>;
    getDefaultRoleId(): Promise<string>;
    getById(id: string): Promise<UserRecord | null>;
    updateFullName(id: string, full_name: string): Promise<UserRecord>;
    getRoleById(roleId: string): Promise<{
        id: string;
        name: string;
    } | null>;
}
