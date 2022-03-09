/* eslint-disable prettier/prettier */
import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { USER_CREATE_USER_ERROR, USER_DELETE_USER_ERROR, USER_READ_ALL_USERS_ERROR, USER_UPDATE_USER_ERROR } from 'src/common/errors';
import { Role } from 'src/roles/entities';
import { User } from 'src/users/entities';
import { Action } from './enums/actions.enums';

export type Subjects = InferSubjects<typeof User | typeof Role> | 'all';
export type AppAbility = Ability<[Action, Subjects]>;
@Injectable()
export class AbilityFactory {
    defineAbility(user: User) {
        // define rules
        const { can, cannot, build } = new AbilityBuilder(Ability as AbilityClass<AppAbility>);
        if (user.role.role === 'ADMIN') {
            can(Action.Manage, 'all');
        }
        if (user.role.role !== 'ADMIN') {
            can(Action.ReadOne, User, { dni: { $eq: user.dni } });
            can(Action.Update, User, { dni: { $eq: user.dni } });

            cannot(Action.Read, User).because(USER_READ_ALL_USERS_ERROR);
            cannot(Action.Create, User).because(USER_CREATE_USER_ERROR);
            cannot(Action.Delete, User).because(USER_DELETE_USER_ERROR);
            cannot(Action.UpdateRole, User).because(USER_UPDATE_USER_ERROR);
        }
        return build({
            detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
        });
    }
}
