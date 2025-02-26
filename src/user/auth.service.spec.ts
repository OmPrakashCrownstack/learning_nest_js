import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import CreateUserDto from './dto/create-user.dto';
import { User } from './user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUserService: Partial<UserService> = {};

  beforeAll(async () => {
    const users: User[] = [];
    fakeUserService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (createUserDto: CreateUserDto) => {
        const newUser = {
          id: Date.now(),
          ...createUserDto,
        } as User;
        users.push(newUser);
        return Promise.resolve(newUser);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: fakeUserService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('Can create an instance of AuthService', () => {
    expect(service).toBeDefined();
  });

  it('Create new user with a salt and hash password', async () => {
    const user = await service.signup({
      email: 'random@example.com',
      password: 'qwerty',
    });

    expect(user.password).not.toEqual('qwerty');

    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws if signin is called with an unused email', async () => {
    await expect(
      service.signin({ email: 'zxcvbnm@email.com', password: '987654321' }),
    ).rejects.toThrow(BadRequestException);
  });

  it('throws if an invalid password is provided', async () => {
    await expect(
      service.signin({ email: 'laskdjf@alskdfj.com', password: 'passowrd' }),
    ).rejects.toThrow(BadRequestException);
  });

  it('throws an error if user signs up with email that is in use', async () => {
    const newUser: CreateUserDto = {
      email: 'asdf@asdf.com',
      password: 'asdf',
    };

    await service.signup(newUser);
    await expect(service.signup(newUser)).rejects.toThrow(BadRequestException);
  });

  it('throws if signin is called with an unused email', async () => {
    await expect(
      service.signin({ email: 'asdflkj@asdlfkj.com', password: 'passdflkj' }),
    ).rejects.toThrow(BadRequestException);
  });

  it('throws if an invalid password is provided', async () => {
    await service.signup({
      email: 'laskdjf@alskdfj.com',
      password: 'password',
    });
    await expect(
      service.signin({ email: 'laskdjf@alskdfj.com', password: 'laksdlfkj' }),
    ).rejects.toThrow(BadRequestException);
  });
});
