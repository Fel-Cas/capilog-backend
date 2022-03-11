/* eslint-disable prettier/prettier */
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
export default class CreateFarms implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .insert()
            .into('farms')
            .values([
                { 
                    farm: 'alhambra'.toUpperCase(),
                    location: 'La Ceja'
                },
                { 
                    farm: 'bouquetera'.toUpperCase(),
                    location: 'La Ceja'
                },
                { 
                    farm: 'bochica'.toUpperCase(),
                    location: 'La Ceja'
                },
                { 
                    farm: 'la ceja'.toUpperCase(),
                    location: 'La Ceja'
                },
                { 
                    farm: 'padua'.toUpperCase(),
                    location: 'La Ceja'
                },
                { 
                    farm: 'san sebastián'.toUpperCase(),
                    location: 'La Ceja' 
                },
                { 
                    farm: 'valley'.toUpperCase(),
                    location: 'La Ceja'
                },
            ])
            .execute();
    }
}
