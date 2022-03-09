import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { CacheService } from 'src/cache/cache.service';
import { UNAUTHORIZED } from '../errors';

@Injectable()
export class VerifyTokenMiddleware implements NestMiddleware {
    constructor(private cacheService: CacheService) {}
    async use(req: any, res: any, next: () => void) {
        let token = req.headers.authorization;
        if (token) {
            token = token.split(' ')[1];
            const tokenFound = await this.cacheService.verifyToken(token);
            if (!tokenFound) {
                throw new UnauthorizedException(UNAUTHORIZED);
            }
        }
        next();
    }
}
