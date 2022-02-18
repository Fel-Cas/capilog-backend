/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '.';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({type: 'varchar', length: 200, nullable: false})
  role: string;

  @OneToMany(()=>User, user=> user.role)
  user:User[];

  constructor(role?: string)
  constructor(role: string) {
    this.id = Math.floor(Math.random() * 5 );
    this.role = role;
  }

}
