import { Test, TestingModule } from '@nestjs/testing';
import { UserRole } from './enums/user-role.enum';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let role: UserRole;
  let controller: UsersController;
  let mockUserService = {
    create: jest.fn((dto) => {
      return {
        id: Math.random() * (1000 - 1) + 1,
        ...dto
      }
    }),
    update: jest.fn((id, dto) => {
      return {
        id,
        ...dto,
      }
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService]
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an user', () => {
    const createUserDto = {
      dni: '123',
      name: 'name-user',
      lastname: 'lastname-user',
      role: role,
      password: 'password-user',
      phone: 'phone-user',
      email: 'email-user',
      createAt: '29'
    };

    expect(controller.create(createUserDto)).toEqual({
      id: expect.any(Number),
      ...createUserDto
    });
  });

  it('should update an user', () => {
    const updateUserDto = {
      dni: '123',
      name: 'name-user',
      lastname: 'lastname-user',
      role: role,
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

});
