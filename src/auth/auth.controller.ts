import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { User as UserEntity } from '../users/entities/user.entity';
import { LocalAuthGuard } from './guards';
import { User, Auth } from 'src/common/decorators';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth routes')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() loginDto: LoginDto, @User() user: UserEntity) {
      const data = await this.authService.login(user);
      return {
        message: 'Login exitoso',
        data,
      };
    }

    @Auth()
    @Get('refresh')
    refreshToken(@User() user: UserEntity) {
      const data = this.authService.login(user);
      return {
        message: 'Refresh exitoso',
        data,
      };
    }


}
