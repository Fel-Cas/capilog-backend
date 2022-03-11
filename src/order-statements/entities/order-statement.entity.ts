/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('order-statements')
export class OrderStatement {
    @PrimaryGeneratedColumn('increment')
    idOrderStatements: number;

    @Column({ type: 'varchar' })
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
