/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TYPEORM_CONFIG } from './config/constants';
import { AbilityModule } from './ability/ability.module';
import { RolesModule } from './roles/roles.module';
import { FarmsModule } from './farms/farms.module';
import { ProcessesModule } from './processes/processes.module';
import databaseConfig from './config/database.config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => config.get(TYPEORM_CONFIG),
        }),
        ConfigModule.forRoot({
            isGlobal: true,
            load: [databaseConfig],
        }),
        UsersModule,
        AuthModule,
        AbilityModule,
        RolesModule,
        FarmsModule,
        ProcessesModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
