import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('routes')
export class Route {
    @PrimaryGeneratedColumn('increment')
    idroutes: number;

    @Column({ type: 'varchar', length: 200, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 200, nullable: true })
    observations: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
