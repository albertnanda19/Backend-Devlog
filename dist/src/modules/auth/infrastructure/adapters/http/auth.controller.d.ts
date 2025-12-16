import { AuthService } from '../../../application/services/auth.service';
import { RegisterRequestDto } from './dto/register.dto';
import { LoginRequestDto } from './dto/login.dto';
import type { Request } from 'express';
import { UpdateMeDto } from './dto/update-me.dto';
export declare class AuthController {
    private readonly repo;
    private readonly authService;
    constructor(repo: any, authService: AuthService);
    register(body: RegisterRequestDto): Promise<{
        success: boolean;
        message: string;
        access_token: string;
        refresh_token: string;
        id: string;
        email: string;
        fullName: string | null;
        role: string | null;
        createdAt: any;
    }>;
    login(body: LoginRequestDto): Promise<{
        success: boolean;
        message: string;
        access_token: string;
        refresh_token: string;
        role: string | null;
    }>;
    me(req: Request): Promise<{
        success: boolean;
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
        };
    }>;
    updateMe(req: Request, body: UpdateMeDto): Promise<{
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
        };
    }>;
    getOne(id: string): Promise<any>;
}
