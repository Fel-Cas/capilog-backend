import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { CreateUserDto, EditUserDto } from '../dto';
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
  let controller: UsersController;
  let spyService: UsersService;
  beforeEach(async () => {
    const UsersServiceProvider = { 
      provide: UsersService,
      useFactory: () => ({
        create: jest.fn(() => []),
        update: jest.fn(() => {}),
        updateRole: jest.fn(() => {}),
        getOne: jest.fn(() => {}),
        getAll: jest.fn(() => []),
        delete: jest.fn(() => {})
      })
    };


    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService , UsersServiceProvider]
    }).compile();

    controller = module.get<UsersController>(UsersController);
    spyService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', () => {
    const createUserDto = new CreateUserDto();
    controller.create(createUserDto);
    expect(spyService.create).toHaveBeenCalled();
    expect(spyService.create).toHaveBeenCalledWith(createUserDto);
  });

  it('should update a user', () => {
    const updateUserDto = new EditUserDto();
    const id = '123';
    controller.update(id, updateUserDto);
    expect(spyService.update).toHaveBeenCalled();
    expect(spyService.update).toHaveBeenCalledWith(id, updateUserDto);
  });

  it('should get a user', () => {
    const id = '1';
    controller.getOne(id);
    expect(spyService.getOne).toHaveBeenCalled();
  });

  it('should get all users', () => {
    controller.getAll();
    expect(spyService.getAll).toHaveBeenCalled();
  });

  it('should update a user,s role', () => {
    const updateRoleUser = new EditUserDto();
    const id = '123';
    controller.updateRole(id, updateRoleUser);
    expect(spyService.updateRole).toHaveBeenCalled();
    expect(spyService.updateRole).toHaveBeenCalledWith(id, updateRoleUser);
  })
  

});
