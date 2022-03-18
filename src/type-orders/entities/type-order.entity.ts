/* eslint-disable prettier/prettier */
import { Order } from "../../orders/entities";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('type-orders')
export class TypeOrder {
    @PrimaryGeneratedColumn('increment')
    idTypeOrder: number;

    @Column({type:'varchar'})
    description: string;

    @OneToMany(()=>Order, order=> order.typeOrder)
    order:Order;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
