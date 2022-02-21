/* eslint-disable prettier/prettier */
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role, User } from '../entities';
import { UsersService } from '../users.service';
import { RoleRepositoryMock } from './role-repository-mock';
import { UserRepositoryMock } from './user-repository-mock';

describe('UsersService', () => {
  let service: UsersService;

  const userDto = {
    dni: '589',
    name: 'Juan',
    lastname: 'Ricardo',
    role: 'COORDINADOR DE TRANSPORTE',
    password: 'carlos12345',
    phone: '3124325678',
    email: 'andres@gmail.com',
  };

  const updateUserDto = {
    name: 'Juan',
    lastname: 'Ricardo',
    password: 'carlos12345',
    phone: '3124325678',
    email: 'juan@gmail.com',
  };

  const updateUserRole = {
    role: 'PORTERO',
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: UserRepositoryMock,
        },
        UsersService,
        {
          provide: getRepositoryToken(Role),
          useClass: RoleRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should return an array of Users', async () => {
    const users = await service.getAll();
    expect(users).toEqual(expect.arrayContaining([expect.any(User)]));
  });

  it('Should return an User', async () => {
    const user = await service.getOne('123');
    expect(user).toEqual(expect.any(User));
  });

  it('Should return an Exception( NotFoundException of User ) in get one user', async () => {
    try {
      expect(await service.getOne('890'));
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('Should create an User', async () => {
    expect(await service.create(userDto)).toEqual(expect.any(User));
  });

  it('Should return an Exception( NotFoundException of Role ) in create user', async () => {
    try {
      userDto.role = 'ADMIN';
      expect(await service.create(userDto));
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('Should delete an User', async () => {
    expect(await service.delete('123')).toEqual(expect.any(User));
  });

  it('Should return an Exception( NotFoundException) in delete user', async () => {
    try {
      expect(await service.delete('90'));
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('Should update an User', async () => {
    expect(await service.update('123', updateUserDto)).toEqual(
      expect.any(User),
    );
  });

  it('Should return an Exception( NotFoundException) in update user', async () => {
    try {
      expect(await service.update('7896', updateUserDto));
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it(`Should update user's  role`, async () => {
    expect(await service.updateRole('123', updateUserRole)).toEqual(
      expect.any(User),
    );
  });

  it(`Should return an Exception( NotFoundException) in update user's role`, async () => {
    try {
      expect(await service.update('7896', updateUserRole));
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });
});
