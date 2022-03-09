/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UNAUTHORIZED } from 'src/common/errors';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err, user, info) {
        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {
            throw err || new UnauthorizedException(UNAUTHORIZED);
        }
        return user;
    }
}
