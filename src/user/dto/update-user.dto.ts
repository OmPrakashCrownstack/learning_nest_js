import { IsEmail, IsString, IsOptional } from 'class-validator';

class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password?: string;
}

export default UpdateUserDto;
