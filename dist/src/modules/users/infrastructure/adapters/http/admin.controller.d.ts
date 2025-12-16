import { UsersService } from '../../../application/services/users.service';
import { GetAdminUsersQueryDto } from './dto/get-admin-users-query.dto';
import { GetAdminUserDetailQueryDto } from './dto/get-admin-user-detail-query.dto';
import { UpdateAdminUserStatusDto } from './dto/update-admin-user-status.dto';
import type { Request } from 'express';
import { UpdateAdminUserRoleDto } from './dto/update-admin-user-role.dto';
export declare class AdminController {
    private readonly usersService;
    constructor(usersService: UsersService);
    list(query: GetAdminUsersQueryDto): Promise<{
        success: boolean;
        message: string;
        data: any;
        meta: {
            page: number | undefined;
            limit: number | undefined;
            totalItems: any;
            totalPages: number;
        };
    }>;
    detail(id: string, query: GetAdminUserDetailQueryDto): Promise<{
        success: boolean;
        message: string;
        data: {
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
        };
    }>;
    updateStatus(req: Request, id: string, body: UpdateAdminUserStatusDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: any;
            email: any;
            isActive: any;
            updatedAt: any;
        };
    }>;
    updateRole(req: Request, id: string, body: UpdateAdminUserRoleDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: any;
            email: any;
            role: {
                id: any;
                name: any;
            };
            updatedAt: any;
        };
    }>;
}
