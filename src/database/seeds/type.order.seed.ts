/* eslint-disable prettier/prettier */
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
export default class CreateOrderStatement implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .insert()
            .into('type-orders')
            .values([
                {
                    description: 'Finca a Finca',
                },
                {
                    description: 'Finca a Aeropuerto',
                },
                {
                    description: 'Finca a Puerto',
                },
            ])
            .execute();
    }
}
