import { TokenServicePort, AccessTokenPayload, RefreshTokenPayload } from '../../application/ports/token-service.port';
export declare class TokenServiceAdapter implements TokenServicePort {
    private readonly jwtService;
    private readonly accessTtlSec;
    private readonly refreshTtlSec;
    constructor();
    signAccessToken(base: Omit<AccessTokenPayload, 'iat' | 'exp'>): string;
    signRefreshToken(base: Omit<RefreshTokenPayload, 'iat' | 'exp'>): string;
}
