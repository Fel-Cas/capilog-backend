import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('trucks')
export class Truck {
    @PrimaryColumn({ type: 'varchar' })
    license: string;

    @Column({ type: 'varchar' })
    driverName: string;

    @Column({ type: 'varchar' })
    dniDriver: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
