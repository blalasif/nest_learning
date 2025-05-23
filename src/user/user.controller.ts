import { Controller, Get } from '@nestjs/common';

@Controller('user') // controller decorator
export class UserController {
  @Get()
  getUser() {
    return 'User Data Fetched Successfull';
  }
}
