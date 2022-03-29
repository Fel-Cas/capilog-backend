/* eslint-disable prettier/prettier */
import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { FARM_PERMISSONS, USER_PERMISSONS } from 'src/common/messages';
import { User } from 'src/users/entities';
import { Action } from '../enums/actions.enums';
import { AppAbility, Subjects } from '../subjects';
import { Farm } from "src/farms/entities";
import { OrderStatement } from "src/order-statements/entities";
import { Order } from "src/orders/entities";
import { RouteOrder } from "src/route-orders/entities";
import { Route } from "src/routes/entities";
import { Truck } from "src/trucks/entities";
import { TypeOrder } from 'src/type-orders/entities';



@Injectable()
export class AbilityFactory {
    defineAbility(user: User) {
        // define rules
        const { can, cannot, build } = new AbilityBuilder(Ability as AbilityClass<AppAbility>);
        if (user.role.role === 'ADMIN') {
            can(Action.Manage, 'all');
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

    TypeOrderAbility(user: User){
        const { can, cannot, build } = new AbilityBuilder(Ability as AbilityClass<AppAbility>);
        if(user.role.role==='ADMIN'){
            can(Action.Manage, 'all');
        }
        if(user.role.role === 'COORDINADOR DE TRANSPORTE' || user.role.role === 'COORDINADOR DE FINCA' ){
            can(Action.Read, TypeOrder);
            can(Action.ReadOne, TypeOrder);
        }

        return build({
            detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
        });
    }

    OrderAbility(user: User){
        const { can, cannot, build } = new AbilityBuilder(Ability as AbilityClass<AppAbility>);
        if(user.role.role==='ADMIN'){
            can(Action.Manage, 'all');
        };
        if(user.role.role==='COORDINADOR DE FINCA'){
            can(Action.Create, Order);            
        }        
        can(Action.Read, Order);
        can(Action.ReadOne, Order);
        can(Action.Update, Order);

        return build({
            detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
        });
    
    }

    OrderStatement(user:User){
        const { can, cannot, build } = new AbilityBuilder(Ability as AbilityClass<AppAbility>);
        if (user.role.role === 'ADMIN') {
            can(Action.Manage, 'all');
        }
        if(user.role.role === 'COORDINADOR DE TRANSPORTE'){

            can(Action.Read, OrderStatement);
            can(Action.ReadOne, OrderStatement);
        }
        return build({
            detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
        });
    }

    FarmAbility( user: User){
        const { can, cannot, build } = new AbilityBuilder(Ability as AbilityClass<AppAbility>);
        if (user.role.role === 'ADMIN') {
            can(Action.Manage, 'all');
        }
        if(user.role.role === 'COORDINADOR DE TRANSPORTE' || user.role.role === 'COORDINADOR DE FINCA'){
            can(Action.Read, Farm);
            can(Action.ReadOne, Farm);
        }

        return build({
            detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
        });
    }

    RouteAbility( user: User){
        const { can, cannot, build } = new AbilityBuilder(Ability as AbilityClass<AppAbility>);
        if (user.role.role === 'ADMIN') {
            can(Action.Manage, 'all');
        }
        if(user.role.role === 'COORDINADOR DE TRANSPORTE'){
            can(Action.Read, Route);
            can(Action.ReadOne, Route);
            can(Action.Update, Route);
            can(Action.Create, Route);
        }
        return build({
            detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
        });
    }

    RouteOrderAbility(user:User){
        const { can, cannot, build } = new AbilityBuilder(Ability as AbilityClass<AppAbility>);
        if (user.role.role === 'ADMIN') {
            can(Action.Manage, 'all');
        }
        if(user.role.role === 'COORDINADOR DE TRANSPORTE'){
            can(Action.Read, RouteOrder);
            can(Action.ReadOne, RouteOrder);
            can(Action.Update, RouteOrder);
            can(Action.Create, RouteOrder);
        }
        return build({
            detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
        });
    }  
    
    TruckAbility(user: User){
        const { can, cannot, build } = new AbilityBuilder(Ability as AbilityClass<AppAbility>);
        if (user.role.role === 'ADMIN') {
            can(Action.Manage, 'all');
        }

        if (user.role.role === 'PORTERO' || user.role.role === 'COORDINADOR DE TRANSPORTE'){
            can(Action.Read, Truck);
            can(Action.ReadOne, Truck);
            can(Action.Update, Truck);
            can(Action.Create, Truck);
        }
        return build({
            detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
        });
    }
}
