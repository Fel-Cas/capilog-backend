import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { UserRole } from '../enums/user-role.enum';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { UsersServiceMock } from './users-service-mock';


const testUser = {
  dni: '123',
  name: 'name-user',
  lastname: 'lastname-user',
  role: 'role',
  password: 'password-user',
  phone: 'phone-user',
  email: 'email-user'
};

const testUserUpdated = {
  name: 'name-user-update',
  lastname: 'lastname-user',
  role: 'role',
  password: 'password-user',
  phone: 'phone-user',
  email: 'email-user'
};

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
      providers: [{
        provide: UsersService,
        useValue: {
          create: jest.fn(() => of (testUser)),  
        } 
      },
      UsersServiceProvider]
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
    const createUserDto = testUser;

    expect(await controller.create(createUserDto));
  });

  it('should update a user', async () => {
    const updateUserDto = testUserUpdated
    const userId = '2';

    expect(await controller.update(userId, updateUserDto)).toEqual({
      // id: userId,
      ...updateUserDto,
    });

    const updateSpy = jest.spyOn(service, 'update');
    controller.update(userId, updateUserDto)

    expect(updateSpy).toHaveBeenCalledWith(userId, updateUserDto);
  });
/*
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
