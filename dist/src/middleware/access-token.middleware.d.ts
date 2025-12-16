import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
export declare class AccessTokenMiddleware implements NestMiddleware {
    private readonly jwt;
    constructor();
    use(req: Request, _res: Response, next: NextFunction): void;
}
