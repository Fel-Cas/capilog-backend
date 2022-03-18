/* eslint-disable prettier/prettier */
import { Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User as UserEntity } from '../users/entities/user.entity';
import { LocalAuthGuard, JwtAuthGuard } from './guards';
import { User } from 'src/common/decorators';
import { CacheService } from 'src/cache/cache.service';
import { LOGIN, LOGOUT, REFRESH_TOKEN } from 'src/common/messages';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private cacheService: CacheService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(200)
    async login(@User() user: UserEntity) {
        const data = await this.authService.login(user);
        const token = data.accessToken;
        await this.cacheService.addToCache(token);
        return {
            data: { ...data },
            meta: { message: LOGIN },
        };
    }

    @Post('logout')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async logout(@Req() req) {
        const token = req.headers.authorization.split(' ')[1];
        await this.cacheService.deleteToken(token);
        return { meta: { message: LOGOUT } };
    }

    @Get('refresh')
    @UseGuards(JwtAuthGuard)
    async refreshToken(@User() user: UserEntity, @Req() req) {
        const data = this.authService.login(user);
        let token = req.headers.authorization.split(' ')[1];
        await this.cacheService.deleteToken(token);
        token = data.accessToken;
        await this.cacheService.addToCache(token);
        return {
            meta: { message: REFRESH_TOKEN },
            data: { ...data },
        };
    }
}
