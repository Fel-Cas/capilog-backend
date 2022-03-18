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
                { role: 'Secretario Logistica'.toUpperCase() },
                { role: 'Almacenista'.toUpperCase() },
                { role: 'Supervisor'.toUpperCase() },
                { role: 'Director Produccion'.toUpperCase() },
                { role: 'Coordinadora'.toUpperCase() },
                { role: 'Analista'.toUpperCase() },
                { role: 'Coordinador'.toUpperCase() },
                { role: 'Jefe de compras'.toUpperCase() },
                { role: 'Jefe Logistica'.toUpperCase() },
                { role: 'Jefe de mantenimiento'.toUpperCase() },
                { role: 'Asistente T.I'.toUpperCase() },
                { role: 'Auxiliar'.toUpperCase() },
                { role: 'Supervisor Consolidados'.toUpperCase() },
            ])
            .execute();
    }
}
