/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('type-orders')
export class TypeOrder {
    @PrimaryGeneratedColumn('increment')
    idTypeOrder: number;

    @Column({type:'varchar'})
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
