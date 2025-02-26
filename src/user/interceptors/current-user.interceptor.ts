import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UserService) {}

  intercept(context: ExecutionContext, handle: CallHandler): Observable<any> {
    const require = context.switchToHttp().getRequest();
    const { userId } = require.session || {};

    if (userId) {
      const user = this.userService.findOne(userId);
      require.currentUser = user;
    }

    return handle.handle();
  }
}
