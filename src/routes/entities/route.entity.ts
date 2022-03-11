import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('routes')
export class Route {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 200, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 200, nullable: true })
    observations: string;
}
