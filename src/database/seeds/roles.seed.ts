/* eslint-disable prettier/prettier */
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
export default class CreateRoles implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .insert()
            .into('roles')
            .values([
                { role: 'Admin'.toUpperCase() },
                { role: 'Portero'.toUpperCase() },
                { role: 'Coordinador de finca'.toUpperCase() },
                { role: 'Coordinador de transporte'.toUpperCase() },
            ])
            .execute();
    }
}
