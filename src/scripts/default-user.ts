/* eslint-disable prettier/prettier */
import { getRepository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities';
import { Role } from 'src/roles/entities';
import {
    USER_DNI,
    USER_EMAIL,
    USER_LASTNAME,
    USER_NAME,
    USER_PASSWORD,
    USER_PHONE,
    USER_ROLE,
} from 'src/config/constants';

const setDefaultUser = async (config: ConfigService) => {
    const userRepository = getRepository<User>(User);
    const roleRepository = getRepository<Role>(Role);

    const defaultUser = await userRepository
        .createQueryBuilder()
        .where('dni = :dni', {
            dni: '1',
        })
        .getOne();

    if (!defaultUser) {
        const adminUser = userRepository.create({
            dni: config.get(USER_DNI),
            name: config.get(USER_NAME),
            lastname: config.get(USER_LASTNAME),
            phone: config.get(USER_PHONE),
            password: config.get(USER_PASSWORD),
            email: config.get(USER_EMAIL),
        });
        const role = await roleRepository.find({ where: { role: config.get(USER_ROLE) } });
        adminUser.role = role[0];
        return await userRepository.save(adminUser);
    }
};

export default setDefaultUser;
