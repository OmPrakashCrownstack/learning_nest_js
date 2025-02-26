import { Expose } from 'class-transformer';

class UserDetailsDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  isAdmin: boolean;
}

export default UserDetailsDto;
