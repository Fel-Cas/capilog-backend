/* eslint-disable prettier/prettier */
import { Controller, Get, HttpCode, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User as UserEntity } from '../users/entities/user.entity';
import { LocalAuthGuard, JwtAuthGuard } from './guards';
import { User } from 'src/common/decorators';
import { CacheService } from 'src/cache/cache.service';
import { LOGIN_SUCCESFUL, LOGOUT, REFRESH_TOKEN } from 'src/common/errors';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly cache: CacheService,
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(200)
    async login(@User() user: UserEntity) {
        const data = await this.authService.login(user);
        const token= data.accessToken;
        this.cache.addToCache(token);
        return {
          data:{...data},
          meta: { message: LOGIN_SUCCESFUL }
        };
    }

    @Post('logout')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async logout(@Req() req){
        const token= req.headers.authorization.split(' ')[1];
        await this.cache.deleteToken(token);
        return{ meta:{ message: LOGOUT}  }
    }

    @Get('refresh')
    @UseGuards(JwtAuthGuard)
    refreshToken(@User() user: UserEntity) {
        const data = this.authService.login(user);
        return {
            meta: [{ message: REFRESH_TOKEN }],
            data: [{ data }],
        };
    }
}
