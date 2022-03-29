import { Route } from '../../routes/entities';
import { Truck } from '../../trucks/entities';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('routeOrders')
export class RouteOrder {
    @PrimaryGeneratedColumn('increment')
    idrouteOrder: number;

    @Column({ type: 'timestamp', nullable: true })
    startDate: Date;

    @Column({ type: 'timestamp', nullable: true })
    finishDate: Date;

    @Column({ type: 'varchar', length: 45, nullable: false })
    state: string;

    @ManyToOne(() => Truck, (Truck) => Truck.routeOrder, {eager:true})
    truck: Truck;

    @ManyToOne(() => Route, (Route) => Route.routeOrder, {eager:true})
    route: Route;

    @Column({ type: 'boolean', nullable: true, default:false })
    isBill: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
