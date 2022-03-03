/* eslint-disable prettier/prettier */
import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability';
import { Injectable } from '@nestjs/common';
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

            cannot(Action.Read, User).because('Only admins can read all users');
            cannot(Action.Create, User).because('Only admins can create  users');
            cannot(Action.Delete, User).because('Only admins can delete  users');
            cannot(Action.UpdateRole, User).because('Only admins can update role of users');
        }
        return build({
            detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
        });
    }
}
