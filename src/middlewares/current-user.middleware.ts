import { Injectable, NestMiddleware } from '@nestjs/common';
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

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(require: Request, response: Response, next: NextFunction) {
    const { userId } = require.session || {};

    if (userId) {
      const user = await this.userService.findOne(userId);
      require.currentUser = user;
    }

    next();
  }
}
