import { IsString, IsEmail } from 'class-validator';

class SignInUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export default SignInUserDto;
