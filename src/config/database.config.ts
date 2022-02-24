/* eslint-disable prettier/prettier */
import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

function typeormModuleOptions(): TypeOrmModuleOptions {
    return {
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [join(__dirname, '../**/**/*entity{.ts,.js}')],
        autoLoadEntities: true,

        // Implementaremos Migrations.
        /** Recursos
         *  * https://typeorm.io/#/migrations
         */
         
        migrationsRun: true,
        migrations: [join(__dirname, '../migration/**/*{.ts,.js}')],
        migrationsTableName: 'migrations_typeorm',
        cli: {
            migrationsDir: 'src/migration',
        },

        // Activar SOLO MANUALMENTE en DESARROLLO SI ES NECESARIO (DESACTIVAR EN PRODUCCION).
        synchronize: false,
        logging: true,
        logger: 'file',
    };
}

export default registerAs('database', () => ({
    config: typeormModuleOptions(),
}));
