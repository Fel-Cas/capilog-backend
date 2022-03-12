/* eslint-disable prettier/prettier */
import { User } from '../../users/entities';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Order } from 'src/orders/entities';

@Entity('farms')
export class Farm {
    @PrimaryGeneratedColumn()
    idFarm: number;

    @Column({ type: 'varchar' })
    farm: string;

    @Column({ type: 'varchar' })
    location: string;

    @OneToMany(() => User, (user) => user.farm)
    user: User;

    @OneToMany(()=> Order, order => order.firstFarm)
    firstFarmOrder: Order;

    @OneToMany(()=> Order, order => order.lastFarm)
    lastFarmOrder: Order;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
