/* eslint-disable prettier/prettier */
import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Role } from '../../users/entities/role.entity';


define(Role,( faker: typeof Faker) =>{
    const role= faker.name.role();
    const roleCreted = new Role();
    roleCreted.role=role;
    return roleCreted;
})