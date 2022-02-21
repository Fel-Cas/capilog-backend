/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

    async validateUser(dni: string, passwordUser: string): Promise<any> {
        const user = await this.usersService.findDni({ dni });
        if (user && (await compare(passwordUser, user.password))) {
            delete user.password;
            return user;
        }
        return null;
    }

    login(user: User) {
        const payload = { sub: user.dni };
        return {
            user,
            accessToken: this.jwtService.sign(payload),
        };
    }
}
