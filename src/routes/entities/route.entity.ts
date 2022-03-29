import { Farm } from '../../farms/entities';
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { RouteOrder } from '../../route-orders/entities';

@Entity('routes')
export class Route {
    @PrimaryGeneratedColumn('increment')
    idroutes: number;

    @Column({ type: 'varchar', length: 200, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 200, nullable: true })
    observations: string;

    @ManyToMany(() => Farm, (farm) => farm.routes, {eager:true})
    farms: Farm[];

    @OneToMany(() => RouteOrder, (RouteOrder) => RouteOrder.route)
    routeOrder: RouteOrder;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
