import { Order } from 'src/orders/entities';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';

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

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
