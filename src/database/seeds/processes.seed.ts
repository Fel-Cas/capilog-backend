/* eslint-disable prettier/prettier */
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
export default class CreateRoles implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .insert()
            .into('processes')
            .values([
                { name: 'acceso a centro de producción'.toUpperCase()},
                { name: 'aereos alhambra' .toUpperCase()},
                { name: 'almacen' .toUpperCase()},
                { name: 'confinamiento' .toUpperCase()},
                { name: 'general' .toUpperCase()},
                { name: 'gestion humana' .toUpperCase()},
                { name: 'mantenimiento' .toUpperCase()},
                { name: 'poscosecha' .toUpperCase()},
                { name: 't.i' .toUpperCase()},
                { name: 'aereos bochica' .toUpperCase()},
                { name: 'compra flor' .toUpperCase()},
                { name: 'compras' .toUpperCase()},
                { name: 'gestión humana' .toUpperCase()},
                { name: 'jefe producción' .toUpperCase()},
                { name: 'maritimos bochica' .toUpperCase()},
                { name: 'almacen bouquetera' .toUpperCase()},
                { name: 'cuarto frio bouquetera' .toUpperCase()},
                { name: 'producto terminado' .toUpperCase()},
                { name: 'tinturados' .toUpperCase()},
                { name: 'almacen la ceja' .toUpperCase()},
                { name: 'aereos padua' .toUpperCase()},
                { name: 'maritimos padua' .toUpperCase()},
                { name: 'aereos san sebastián' .toUpperCase()},
                { name: 'logistica' .toUpperCase()},
                { name: 'operaciones' .toUpperCase()},
                { name: 'transportes' .toUpperCase()},
                { name: 'aereos valley' .toUpperCase()},
                { name: 'maritimos valley' .toUpperCase()},
            ])
            .execute();
    }
}
