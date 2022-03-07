import { User } from "src/users/entities";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('farms')
export class Farm {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar'})
    farm: string;

    @OneToMany(() => User, (user) => user.farm)
    user: User

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
