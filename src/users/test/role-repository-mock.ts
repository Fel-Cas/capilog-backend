/* eslint-disable prettier/prettier */
import { Role } from '../../roles/entities';

export class RoleRepositoryMock {
    rolesInfo = ['COORDINADOR DE TRANSPORTE', 'PORTERO', 'COORDINADOR DE PROCESOS'];
    roles: Role[] = [];

    constructor() {
        this.createRoles();
    }

    find(query): Promise<Role[] | []> {
        const roleToSearch = query['where']['role'];
        for (const role of this.roles) {
            if (role.role === roleToSearch) {
                return Promise.resolve([role]);
            }
        }
        return Promise.resolve([]);
    }

    createRoles() {
        for (const role of this.rolesInfo) {
            this.roles.push(this.createRole(role));
        }
    }

    createRole(role) {
        const roleCreated = new Role();
        roleCreated.id = Math.floor(Math.random() * 5);
        roleCreated.role = role;
        return roleCreated;
    }
}
