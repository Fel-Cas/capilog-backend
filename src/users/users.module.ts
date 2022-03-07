/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbilityModule } from 'src/ability/ability.module';
import { RolesModule } from 'src/roles/roles.module';
import { User } from './entities';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { FarmsModule } from '../farms/farms.module';

@Module({
    imports: [TypeOrmModule.forFeature([User]), AbilityModule, RolesModule, FarmsModule],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
