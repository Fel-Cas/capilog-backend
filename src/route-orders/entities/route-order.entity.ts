import { Route } from "src/routes/entities";
import { Truck } from "src/trucks/entities";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('routeOrders')
export class RouteOrder {
    @PrimaryGeneratedColumn('increment')
    idrouteOrder: number;

    @OneToOne(() => Route)
    @JoinColumn()
    route: Route;

    @Column({ type: 'timestamp', nullable: true})
    startDate: Date;

    @Column({ type: 'timestamp', nullable: true})
    finishDate: Date;

    @Column({ type: 'varchar', length: 45, nullable: false })
    state: string;

    @OneToOne(() => Truck)
    @JoinColumn()
    truck: Truck;

    @Column({ type: 'boolean', nullable: true })
    isBill: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
    
}
