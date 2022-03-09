import { User } from "../../users/entities";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('processes')
export class Process {
    @PrimaryGeneratedColumn()
    idProcess: number;

    @Column({ type: 'varchar'})
    name: string;

    @ManyToMany(() => User, user => user.processes)
    users: User[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
