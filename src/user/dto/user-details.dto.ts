import { Expose } from 'class-transformer';

class UserDetailsDto {
  @Expose()
  id: number;

  @Expose()
  email: string;
}

export default UserDetailsDto;
