/* eslint-disable prettier/prettier */
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Role } from '../../users/entities/role.entity';

export default class CreateRoles implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .insert()
            .into('roles')
            .values([
                { role: 'ADMIN' },
                { role: 'COORDINADOR DE TRANSPORTE' },
                { role: 'COORDINADOR DE PROCESO' },
                { role: 'PORTERO' },
                { role: 'COORDINADOR DE FINCA' },
            ])
            .execute();
    }
}
