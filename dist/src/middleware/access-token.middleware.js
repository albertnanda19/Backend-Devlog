"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessTokenMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const fs = __importStar(require("node:fs"));
const path = __importStar(require("node:path"));
function readKeyFile(envKey, fallback) {
    const configured = process.env[envKey];
    const filePath = configured && configured.trim().length > 0 ? configured : fallback;
    const absPath = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
    return fs.readFileSync(absPath, 'utf8');
}
let AccessTokenMiddleware = class AccessTokenMiddleware {
    jwt;
    constructor() {
        const publicKey = readKeyFile('PUBLIC_KEY_PATH', 'public_key.pem');
        this.jwt = new jwt_1.JwtService({ publicKey });
    }
    use(req, _res, next) {
        const header = req.headers['authorization'];
        if (!header || typeof header !== 'string' || !header.startsWith('Bearer ')) {
            throw new common_1.UnauthorizedException('Token otorisasi tidak ditemukan atau tidak valid');
        }
        const token = header.substring('Bearer '.length).trim();
        if (!token) {
            throw new common_1.UnauthorizedException('Token otorisasi tidak ditemukan atau tidak valid');
        }
        try {
            const payload = this.jwt.verify(token, {
                algorithms: ['RS256'],
                ignoreExpiration: false,
            });
            if (payload['type'] !== 'access') {
                throw new common_1.ForbiddenException('Token bukan access token yang valid');
            }
            if (!payload['sub'] || typeof payload['sub'] !== 'string') {
                throw new common_1.UnauthorizedException('Token tidak memiliki subject yang valid');
            }
            req.user = {
                id: payload['sub'],
                email: payload['email'],
                roles_id: payload['roles_id'],
            };
            return next();
        }
        catch (e) {
            if (e instanceof common_1.UnauthorizedException || e instanceof common_1.ForbiddenException) {
                throw e;
            }
            throw new common_1.UnauthorizedException('Token tidak valid atau telah kedaluwarsa');
        }
    }
};
exports.AccessTokenMiddleware = AccessTokenMiddleware;
exports.AccessTokenMiddleware = AccessTokenMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AccessTokenMiddleware);
//# sourceMappingURL=access-token.middleware.js.map