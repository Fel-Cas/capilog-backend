/* eslint-disable prettier/prettier */
import { User } from '../entities';
import { Role } from 'src/roles/entities';

export class UserRepositoryMock {
    userInfo = [
        {
            dni: '123',
            name: 'Juan',
            lastname: 'Ricardo',
            role: 'COORDINADOR DE TRANSPORTE',
            password: 'carlos12345',
            phone: '3124325678',
            email: 'andres@gmail.com',
        },
        {
            dni: '567',
            name: 'Roberto',
            lastname: 'Gutierrez',
            role: 'COORDINADOR DE PROCESOS',
            password: 'roberto12345',
            phone: '3124325678',
            email: 'roberto@gmail.com',
        },
    ];
    users: User[] = [];

    constructor() {
        this.createUsers();
    }

    find(): Promise<User[]> {
        const users = this.users;
        return Promise.resolve(users);
    }

    findOne(id: string): Promise<User | null> {
        for (const user of this.users) {
            if (user.dni === id) {
                return Promise.resolve(user);
            }
        }
        return Promise.resolve(null);
    }

    save(user: User): Promise<User> {
        if (this.users.indexOf(user) !== -1) this.remove(user);
        return Promise.resolve(user);
    }

    remove(user: User): Promise<User | null> {
        this.users.splice(this.users.indexOf(user), 1);
        return Promise.resolve(user);
    }

    create(content) {
        let user = new User();
        user.role = this.createRole(content.role);
        user = Object.assign(user, content);
        return user;
    }

    createRole(role) {
        const roleCreated = new Role();
        roleCreated.id = 1;
        roleCreated.role = role;
        return role;
    }

    createUsers() {
        for (const user of this.userInfo) {
            this.users.push(this.create(user));
        }
    }
}
