import { Repository } from 'typeorm';
import { User } from './user.entity';
import CreateUserDto from './dto/create-user.dto';
export declare class UserService {
    private userRepo;
    constructor(userRepo: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findOne(id: number): Promise<User | null>;
    find(email: string): Promise<User[]>;
    update(id: number, attrs: Partial<User>): Promise<User>;
    remove(id: number): Promise<User>;
}
