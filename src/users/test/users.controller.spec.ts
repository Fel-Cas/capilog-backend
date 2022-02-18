import { Test, TestingModule } from '@nestjs/testing';
import { UserRole } from '../enums/user-role.enum';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { UsersServiceMock } from './users-service-mock';

describe('UsersController', () => {
  let role: UserRole;
  let controller: UsersController;
  let service: UsersService;
  /*let mockUserService = {
     update: jest.fn((id, dto) => {
      return {
        id,
        ...dto,
      }
    }),

    getAll: jest.fn(() => {
      return
    }),

    // getOne: jest.fn((id, dto) => {
    //   return {
    //     id,
    //     ...dto
    //   }
    // })
    getOne: jest.fn().mockImplementation((id, dto) => ({
      id,
      ...dto
    }))
  };*/

  beforeEach(async () => {
    const UsersServiceProvider = { 
      provide: UsersService,
      useClass: UsersServiceMock,
    };


    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, UsersServiceProvider]
    })
      .overrideProvider(UsersService)
      .useClass(UsersServiceMock)
      .compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto = {
      dni: '123',
      name: 'name-user',
      lastname: 'lastname-user',
      role: 'role',
      password: 'password-user',
      phone: 'phone-user',
      email: 'email-user'
    };

    expect(await controller.create(createUserDto));
  });
/*
  it('should update a user', () => {
    const updateUserDto = {
      dni: '123',
      name: 'name-user',
      lastname: 'lastname-user',
      role: 'role',
      password: 'password-user',
      phone: 'phone-user',
      email: 'email-user'
    };
    const userId = '2';

    expect(controller.update(userId, updateUserDto)).toEqual({
      id: userId,
      ...updateUserDto,
    });

    expect(mockUserService.update).toHaveBeenCalledWith(userId, updateUserDto);
  });

  it('should get the users', () => {
    expect(controller.getAll())
  })

  it('should get a user', () => {
    const userId = '2';
    expect(controller.getOne(userId)).toEqual({
      id: userId
    })
  })*/

});
