import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
      ) {}

  async validateUser(dni: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({dni});
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  login(user: User) {
    const { dni, ...rest } = user;
    const payload = { sub: dni };

    return {
      user,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
