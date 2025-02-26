import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
declare global {
    namespace Express {
        interface Request {
            currentUser?: User | null;
        }
    }
}
export declare class CurrentUserMiddleware implements NestMiddleware {
    private readonly userService;
    constructor(userService: UserService);
    use(require: Request, response: Response, next: NextFunction): Promise<void>;
}
