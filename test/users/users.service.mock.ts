/* eslint-disable prettier/prettier */
import  { User } from '../../src/users/entities';

export class UserServiceMock {
    users: User[] = [
        new User(
          '123',
          'Juan',
          'Ricardo',
          'carlos12345',
          '3124325678',
          'andres@gmail.com',
          'COORDINADOR DE TRANSPORTE',
          new Date("2022-02-20T01:43:49.951Z"),
          new Date("2022-02-20T01:43:49.951Z")),
          new User(
            '567',
            'Roberto',
            'Gutierrez',
            'roberto12345',
            '3124325678',
            'roberto@gmail.com',
            'COORDINADOR DE PROCESOS',           
            new Date("2022-02-20T01:43:49.951Z"),
            new Date("2022-02-20T01:43:49.951Z"))
        ]
        find(): Promise<User[]> {
          const users= this.users;
          return Promise.resolve(users);  
        }
    
        findOne(id: string, object?: any): Promise<User | null >{
            
            for( const user of this.users){
                if(user.dni === id){
                    return Promise.resolve(user);
                }
            }
            return Promise.resolve(null);
        }
    
        save(user: User): Promise<User>{
            if(this.users.indexOf(user) !== -1) this.remove(user);
            user.createdAt= new Date("2022-02-20T01:43:49.951Z");
            user.updatedAt = new Date("2022-02-20T01:43:49.951Z");
            return Promise.resolve(user);
        }
    
        remove(user: User): Promise<User| null>{
            this.users.splice(this.users.indexOf(user),1);
            return Promise.resolve(user);
        }
}