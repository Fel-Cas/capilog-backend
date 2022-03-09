/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class Middleware implements NestMiddleware {
  constructor(private cache: CacheService) {}
  async use(req: any, res: any, next: () => void) {
    let token=req.headers.authorization;
    if(token){
      token=token.split(' ')[1];
      const tokenFound=await this.cache.verifyCache(token);
      if(!tokenFound){
        throw new UnauthorizedException('unauthorized');
      }
    }
    next();
  }
}
