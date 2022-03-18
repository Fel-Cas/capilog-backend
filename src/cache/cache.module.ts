/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CacheModule as Cache } from '@nestjs/common';
import { CacheService } from './cache.service';

@Module({
    imports: [
        Cache.register({
            ttl: 3600,
        }),
    ],
    providers: [CacheService],
    exports: [CacheService],
})
export class CacheModule {}
