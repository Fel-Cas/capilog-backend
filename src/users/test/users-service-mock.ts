/* eslint-disable prettier/prettier */
import { CreateUserDto, EditUserDto } from "../dto"
import { Role, User } from "../entities"
import { UserRole } from "../enums/user-role.enum";

export class UsersServiceMock {
    async create(createUserDto: CreateUserDto): Promise<User> {
        const role = new Role();
        let user = new User();
        user = Object.assign(user, createUserDto);
        role.id = 1;
        role.role = 'role';
        user.createdAt = new Date(Date.now());
        user.updatedAt = new Date(Date.now());
        user.role = {
            ...role
        };
        delete user.password;
        return Promise.resolve(user);
    }

    async update(id: number, editUserDto: EditUserDto): Promise<User> {
        const role = new Role();
        let user = new User();
        user = Object.assign(user, editUserDto);
        role.id = id;
        console.log(user);
        return Promise.resolve(user)
    }

    /*
    async getOne(id: number): Promise<User> {
        let user = new User();
        delete user.password;
        return Promise.resolve({
            id,
            ...user
        })
    }*/
}
