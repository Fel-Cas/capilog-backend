/* eslint-disable prettier/prettier */
import { Order } from '../../orders/entities';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('order-statements')
export class OrderStatement {
    @PrimaryGeneratedColumn('increment')
    idOrderStatement: number;

    @Column({ type: 'varchar' })
    description: string;

    @OneToMany(() => Order, (order) => order.statement)
    order: Order;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
