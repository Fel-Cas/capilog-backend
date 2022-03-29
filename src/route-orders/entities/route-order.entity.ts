import { Route } from '../../routes/entities';
import { Truck } from '../../trucks/entities';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
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

    @OneToOne(() => Truck)
    @JoinColumn()
    truck: Truck;

    @Column({ type: 'boolean', nullable: true, default:false })
    isBill: boolean;

    @OneToMany(() => Route, (Route) => Route.routeOrder, {eager:true})
    route: Route[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
