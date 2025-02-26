import { UserService } from './user.service';
import CreateUserDto from './dto/create-user.dto';
import SignInUserDto from './dto/signin-user.dto';
export declare class AuthService {
    private readonly userService;
    constructor(userService: UserService);
    signup(createUserDto: CreateUserDto): Promise<import("./user.entity").User>;
    signin(signInUserDto: SignInUserDto): Promise<import("./user.entity").User>;
}
