/* eslint-disable prettier/prettier */
import { InferSubjects } from '@casl/ability';
import { Farm } from 'src/farms/entities';
import { OrderStatement } from 'src/order-statements/entities';
import { Order } from 'src/orders/entities';
import { Role } from 'src/roles/entities';
import { RouteOrder } from 'src/route-orders/entities';
import { Route } from 'src/routes/entities';
import { Truck } from 'src/trucks/entities';
import { User } from 'src/users/entities/user.entity';

export type Subjects =
    | InferSubjects<
          | typeof User
          | typeof Role
          | typeof Farm
          | typeof Truck
          | typeof OrderStatement
          | typeof Order
          | typeof Route
          | typeof RouteOrder
      >
    | 'all';
