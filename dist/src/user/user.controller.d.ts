import CreateUserDto from './dto/create-user.dto';
import SignInUserDto from './dto/signin-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
export declare class UserController {
    private userService;
    private authService;
    constructor(userService: UserService, authService: AuthService);
    createUser(body: CreateUserDto, session: any): Promise<User>;
    login(body: SignInUserDto, session: any): Promise<User>;
    whoAmI(currentUser: User): Promise<User>;
    signout(session: any): void;
    getUserById(id: string): Promise<User>;
    getUserByEmail(email: string): Promise<User[]>;
    updateUser(id: string, body: UpdateUserDto): Promise<User>;
    deleteUser(id: string): Promise<User>;
}
