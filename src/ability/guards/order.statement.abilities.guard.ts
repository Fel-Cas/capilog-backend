/* eslint-disable prettier/prettier */
import { ForbiddenError } from '@casl/ability';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Rules } from 'src/ability/interfaces';
import { CHECK_ABILITY } from 'src/config/constants';
import { AbilityFactory } from '../abilities';

@Injectable()
export class OrderStatementGuard implements CanActivate {
    constructor(private reflector: Reflector, private caslAbilityFactory: AbilityFactory) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const rules = this.reflector.get<Rules[]>(CHECK_ABILITY, context.getHandler()) || [];
        const { user } = context.switchToHttp().getRequest();
        const ability = this.caslAbilityFactory.OrderStatement(user);

        try {
            rules.forEach((rule) => ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject));
            return true;
            //return rules.every((rule) => ability.can(rule.action, rule.subject));
        } catch (error) {
            if (error instanceof ForbiddenError) throw new ForbiddenException(error.message);
        }
    }
}
