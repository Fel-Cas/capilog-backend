import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async addToCache(token: string) {
        await this.cacheManager.set(token, token);
    }

    async verifyToken(token: string) {
        return await this.cacheManager.get(token);
    }

    async deleteToken(token: string) {
        await this.cacheManager.del(token);
    }
}
