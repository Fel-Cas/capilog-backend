/* eslint-disable prettier/prettier */
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
export default class CreateOrderStatement implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .insert()
            .into('order-statements')
            .values([
                {
                    description: 'pedida'.toUpperCase(),
                },
                {
                    description: 'terminada'.toUpperCase(),
                },
                {
                    description: 'cancelada'.toUpperCase(),
                },
                {
                    description: 'asignada'.toUpperCase(),
                },
            ])
            .execute();
    }
}
