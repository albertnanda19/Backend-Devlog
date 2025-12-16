export declare class GetAdminUsersQueryDto {
    page?: number;
    limit?: number;
    role?: 'ADMIN' | 'USER';
    isActive?: boolean;
    search?: string;
    sortBy?: 'createdAt' | 'email' | 'fullName';
    order?: 'asc' | 'desc';
}
