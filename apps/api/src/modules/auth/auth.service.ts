import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(
    pass: string,
    username: string,
  ): Promise<any> {
    const user = await this.userService.getUserByAccess(pass, username);
    if (!user) {
      return null;
    }
    return user;
  }
}
