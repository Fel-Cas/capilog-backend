/* eslint-disable prettier/prettier */
import { Order } from '../../orders/entities';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { RouteOrder } from '../../route-orders/entities';

@Entity('trucks')
export class Truck {
    @PrimaryColumn({ type: 'varchar' })
    license: string;

    @Column({ type: 'varchar' })
    driverName: string;

    @Column({ type: 'varchar' })
    dniDriver: string;

    @OneToMany(() => Order, (order) => order.truck)
    order: Order;

    @OneToMany(() => RouteOrder, (RouteOrder) => RouteOrder.route)
    routeOrder: RouteOrder;

    @Column({type:'bool'})
    isExternal:boolean;
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
