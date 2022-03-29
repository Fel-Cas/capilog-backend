/* eslint-disable prettier/prettier */
import { User } from '../../users/entities';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Order } from '../../orders/entities';
import { Route } from '../../routes/entities';

@Entity('farms')
export class Farm {
    @PrimaryGeneratedColumn('increment')
    idFarm: number;

    @Column({ type: 'varchar' })
    farm: string;

    @Column({ type: 'varchar' })
    location: string;

    @OneToMany(() => User, (user) => user.farm)
    user: User;

    @OneToMany(() => Order, (order) => order.firstFarm)
    firstFarmOrder: Order;

    @OneToMany(() => Order, (order) => order.lastFarm)
    lastFarmOrder: Order;

    @ManyToMany(() => Route, (route) => route.farms )
    @JoinTable({ name: 'routes_farms' })
    routes: Route[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
