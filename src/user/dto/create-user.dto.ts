import { IsString, IsEmail } from 'class-validator';

class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export default CreateUserDto;
