/* eslint-disable prettier/prettier */
import { hash } from 'bcrypt';
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../roles/entities';

@Entity('users')
export class User {
    @PrimaryColumn()
    dni: string;

    @Column({ type: 'varchar', length: 150, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 150, nullable: false })
    lastname: string;

    @Column({ type: 'varchar', length: 250, nullable: false, select: false })
    password: string;

    @Column({ type: 'varchar', length: 20, nullable: false })
    phone: string;

    @Column({ type: 'varchar', length: 250, nullable: false })
    email: string;

    @ManyToOne(() => Role, (role) => role.user)
    @JoinColumn({ name: 'role' })
    role: Role;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (!this.password) {
            return;
        }
        this.password = await hash(this.password, 10);
    }
}
