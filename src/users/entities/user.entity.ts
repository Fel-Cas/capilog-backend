/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Role } from ".";

@Entity('users')
export class User {
  @PrimaryColumn()
  dni: string;

  @Column({type: 'varchar', length: 150, nullable: false})
  name: string;

  @Column({type: 'varchar', length: 150, nullable: false})
  lastname: string;

  @Column({type: 'varchar', length: 250, nullable: false})
  password: string;

  @Column({type: 'varchar', length: 20, nullable: false})
  phone: string;

  @Column({type: 'varchar', length: 250, nullable: false})
  email: string;

  @ManyToOne(()=>Role,role=>role.user)
  @JoinColumn({name: 'role' })
  role:Role;

  @CreateDateColumn()
  createAt:Date;

  @UpdateDateColumn()
  updatedAt:Date;
}