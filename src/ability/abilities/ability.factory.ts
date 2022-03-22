/* eslint-disable prettier/prettier */
import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { FARM_PERMISSONS, USER_PERMISSONS } from 'src/common/messages';
import { Farm } from 'src/farms/entities';
import { OrderStatement } from 'src/order-statements/entities';
import { Order } from 'src/orders/entities';
import { Process } from 'src/processes/entities';
import { Role } from 'src/roles/entities';
import { RouteOrder } from 'src/route-orders/entities';
import { Route } from 'src/routes/entities';
import { Truck } from 'src/trucks/entities';
import { TypeOrder } from 'src/type-orders/entities';
import { User } from 'src/users/entities';
import { Action } from '../enums/actions.enums';

export type Subjects =
    | InferSubjects<
          | typeof User
          | typeof Role
          | typeof Farm
          | typeof Process
          | typeof Truck
          | typeof TypeOrder
          | typeof OrderStatement
          | typeof Order
          | typeof Route
          | typeof RouteOrder
      >
    | 'all';
export type AppAbility = Ability<[Action, Subjects]>;
@Injectable()
export class AbilityFactory {
    defineAbility(user: User) {
        // define rules
        const { can, cannot, build } = new AbilityBuilder(Ability as AbilityClass<AppAbility>);
        if (user.role.role === 'ADMIN') {
            can(Action.Manage, 'all');
        }
        if(user.role.role === 'COORDINADOR DE TRANSPORTE'){
            can(Action.Read, TypeOrder);
            can(Action.ReadOne, TypeOrder);

            can(Action.Read, Truck);
            can(Action.ReadOne, Truck);
            can(Action.Update, Truck);
            can(Action.Create, Truck);

            can(Action.Read, Order);
            can(Action.ReadOne, Order);
            can(Action.Update, Order);

            can(Action.Read, OrderStatement);
            can(Action.ReadOne, OrderStatement);

            can(Action.Read, Farm);
            can(Action.ReadOne, Farm);

            can(Action.Read, Route);
            can(Action.ReadOne, Route);
            can(Action.Update, Route);
            can(Action.Create, Route);

            can(Action.Read, RouteOrder);
            can(Action.ReadOne, RouteOrder);
            can(Action.Update, RouteOrder);
            can(Action.Create, RouteOrder);

        }
        if(user.role.role === 'COORDINADOR DE FINCA'){
            can(Action.Read, TypeOrder)
            can(Action.ReadOne, TypeOrder)

            can(Action.Read, Order);
            can(Action.ReadOne, Order);
            can(Action.Update, Order);
            can(Action.Create, Order);
            
            can(Action.Read, Farm);
            can(Action.ReadOne, Farm);
        }
        if(user.role.role === 'PORTERO'){

            can(Action.Read, Truck);
            can(Action.ReadOne, Truck);
            can(Action.Update, Truck);
            can(Action.Create, Truck);

            can(Action.Read, Order);
            can(Action.ReadOne, Order);
            can(Action.Update, Order);
            
        }
        if(user.role.role !== 'ADMIN'){
            can(Action.ReadOne, User, { dni: { $eq: user.dni } });
            can(Action.Update, User, { dni: { $eq: user.dni } });
            cannot(Action.Read, User).because(USER_PERMISSONS);
            cannot(Action.Create, User).because(USER_PERMISSONS);
            cannot(Action.Delete, User).because(USER_PERMISSONS);
            cannot(Action.UpdateRole, User).because(USER_PERMISSONS);
            cannot(Action.UpdateFarm, User).because(USER_PERMISSONS);
            cannot(Action.Read, Farm).because(FARM_PERMISSONS);
            cannot(Action.Create, Farm).because(FARM_PERMISSONS);
            cannot(Action.Update, Farm).because(FARM_PERMISSONS);
            cannot(Action.Delete, Farm).because(FARM_PERMISSONS);
        }
        
        return build({
            detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
        });
    }
}
