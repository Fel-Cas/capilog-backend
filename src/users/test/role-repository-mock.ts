/* eslint-disable prettier/prettier */
import { Role } from '../entities';

export class RoleRepositoryMock {
  roles: Role[] = [
    new Role('COORDINADOR DE TRANSPORTE'),
    new Role('PORTERO'),
    new Role('COORDINADOR DE PROCESOS'),
  ];

  find(query): Promise<Role[] | []> {
    const roleToSearch = query['where']['role'];
    for (const role of this.roles) {
      if (role.role === roleToSearch) {
        return Promise.resolve([role]);
      }
    }
    return Promise.resolve([]);
  }
}
