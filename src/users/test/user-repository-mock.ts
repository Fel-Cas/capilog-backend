/* eslint-disable prettier/prettier */
import { User } from '../entities';

export class UserRepositoryMock {
  users: User[] = [
    new User(
      '123',
      'Juan',
      'Ricardo',
      'COORDINADOR DE TRANSPORTE',
      'carlos12345',
      '3124325678',
      'andres@gmail.com',
      new Date(Date.now()),
      new Date(Date.now())),
      new User(
        '567',
        'Roberto',
        'Gutierrez',
        'COORDINADOR DE PROCESOS',
        'roberto12345',
        '3124325678',
        'roberto@gmail.com',
        new Date(Date.now()),
        new Date(Date.now())
      )
    ]
    find(): Promise<User[]> {
      const users= this.users;
      return Promise.resolve(users);  
    }

    findOne(id: string): Promise<User | null >{
        for( const user of this.users){
            if(user.dni === id){
                return Promise.resolve(user);
            }
        }
        return Promise.resolve(null);
    }

    save(user: User): Promise<User>{
        if(this.users.indexOf(user) !== -1) this.remove(user);
        return Promise.resolve(user);
    }

    remove(user: User): Promise<User| null>{
        this.users.splice(this.users.indexOf(user),1);
        return Promise.resolve(user);
    }

}
