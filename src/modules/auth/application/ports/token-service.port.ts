export type JwtPair = {
  accessToken: string;
  refreshToken: string;
};

export type AccessTokenPayload = {
  sub: string;
  type: 'access';
  email: string;
  roles_id: string[];
  iat: number;
  exp: number;
};

export type RefreshTokenPayload = {
  sub: string;
  type: 'refresh';
  iat: number;
  exp: number;
};

export abstract class TokenServicePort {
  abstract signAccessToken(payload: Omit<AccessTokenPayload, 'iat' | 'exp'>): string;
  abstract signRefreshToken(payload: Omit<RefreshTokenPayload, 'iat' | 'exp'>): string;
}


