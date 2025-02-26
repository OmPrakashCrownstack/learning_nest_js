import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import CreateUserDto from './dto/create-user.dto';
import SignInUserDto from './dto/signin-user.dto';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signup(createUserDto: CreateUserDto) {
    const users = await this.userService.find(createUserDto.email);
    if (users.length) {
      throw new BadRequestException('User already exists');
    }

    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(createUserDto.password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');
    createUserDto.password = result;

    return this.userService.create(createUserDto);
  }

  async signin(signInUserDto: SignInUserDto) {
    const user = (await this.userService.find(signInUserDto.email))[0];
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(signInUserDto.password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Invalid credentials');
    }

    return user;
  }
}
