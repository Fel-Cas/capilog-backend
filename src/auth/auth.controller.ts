/* eslint-disable prettier/prettier */
import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User as UserEntity } from '../users/entities/user.entity';
import { LocalAuthGuard, JwtAuthGuard } from './guards';
import { User } from 'src/common/decorators';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@User() user: UserEntity) {
        const data = await this.authService.login(user);
        return {
            meta: [{ message: 'Login exitoso' }],
            data: [{ data }],
        };
    }

    @Get('refresh')
    @UseGuards(JwtAuthGuard)
    refreshToken(@User() user: UserEntity) {
        const data = this.authService.login(user);
        return {
            meta: [{ message: 'Refresh exitoso' }],
            data: [{ data }],
        };
    }
}
