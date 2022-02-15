/* eslint-disable prettier/prettier */
import { DynamicModule } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DB_HOST, DB_LOGGING, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "src/config/constants";
import { ConnectionOptions } from "typeorm";

export const DatabaseProvider: DynamicModule = TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    async useFactory (config: ConfigService){
        const dbConfig={
            type: 'mysql',
            host: config.get(DB_HOST),
            port: +config.get(DB_PORT),
            username: config.get(DB_USER),
            password: config.get(DB_PASSWORD),
            database: config.get(DB_NAME),
            autoLoadEntities:true,
            synchronize: true,
            logging: config.get(DB_LOGGING)
        } as ConnectionOptions;
        return dbConfig;
    }
});