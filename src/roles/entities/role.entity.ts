/* eslint-disable prettier/prettier */
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities';

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 200, nullable: false })
    role: string;

    @OneToMany(() => User, (user) => user.role)
    user: User[];
}
