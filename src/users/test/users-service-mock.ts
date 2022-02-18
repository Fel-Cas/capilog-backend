import { CreateUserDto } from "../dto"
import { Role, User } from "../entities"
import { UserRole } from "../enums/user-role.enum";

export class UsersServiceMock {
    async create(createUserDto: CreateUserDto): Promise<User> {
        let role = new Role();
        let user = new User();
        user = Object.assign(user, createUserDto);
        role.id = 1;
        role.role = 'role';
        user.createAt = new Date(Date.now());
        user.updatedAt = new Date(Date.now());
        user.role = {
            ...role
        };
        console.log(user);
        delete user.password;
        return Promise.resolve(user);
    }
}
