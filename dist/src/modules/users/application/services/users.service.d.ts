import { SupabaseClient } from '@supabase/supabase-js';
import { GetAdminUsersQueryDto } from '../../infrastructure/adapters/http/dto/get-admin-users-query.dto';
import { GetAdminUserDetailQueryDto } from '../../infrastructure/adapters/http/dto/get-admin-user-detail-query.dto';
import { UpdateAdminUserStatusDto } from '../../infrastructure/adapters/http/dto/update-admin-user-status.dto';
import { UpdateAdminUserRoleDto } from '../../infrastructure/adapters/http/dto/update-admin-user-role.dto';
import { AuditLoggerService } from '../../../../infrastructure/logger/audit-logger.service';
export declare class UsersService {
    private readonly supabase;
    private readonly repo;
    private readonly auditLogger;
    constructor(supabase: SupabaseClient, repo: any, auditLogger: AuditLoggerService);
    listUsers(query: GetAdminUsersQueryDto): Promise<{
        items: never[];
        total: number;
        page?: undefined;
        limit?: undefined;
    } | {
        items: any;
        total: any;
        page: number;
        limit: number;
    }>;
    updateUserRole(actorUserId: string, targetUserId: string, dto: UpdateAdminUserRoleDto): Promise<{
        id: any;
        email: any;
        role: {
            id: any;
            name: any;
        };
        updatedAt: any;
    }>;
    getUserDetail(userId: string, query: GetAdminUserDetailQueryDto): Promise<{
        id: any;
        email: any;
        fullName: any;
        role: {
            id: any;
            name: any;
        } | null;
        isActive: any;
        createdAt: any;
        updatedAt: any;
        stats: any;
        projects: any[] | undefined;
    }>;
    updateUserStatus(actorUserId: string, targetUserId: string, dto: UpdateAdminUserStatusDto): Promise<{
        id: any;
        email: any;
        isActive: any;
        updatedAt: any;
    }>;
}
