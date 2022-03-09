import { User } from "../../users/entities";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('farms')
export class Farm {
    @PrimaryGeneratedColumn()
    idFarm: number;

    @Column({ type: 'varchar'})
    farm: string;

    @Column({type:'varchar'})
    location: string;

    @OneToMany(() => User, (user) => user.farm)
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
