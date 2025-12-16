import { TokenServicePort } from '../ports/token-service.port';
import { UserRepositoryPort } from '../ports/user.repository.port';
export declare class AuthService {
    private readonly tokenService;
    private readonly userRepo;
    constructor(tokenService: TokenServicePort, userRepo: UserRepositoryPort);
    register(email: string, password: string, full_name: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            fullName: string | null;
            roleName: string | null;
            createdAt: any;
        };
    }>;
    login(email: string, password: string): Promise<{
        accessToken: string;
        refreshToken: string;
        roleName: string | null;
    }>;
    updateMe(userId: string, full_name: string): Promise<void>;
}
