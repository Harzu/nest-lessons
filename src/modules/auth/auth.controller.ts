import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { CreateUserDTO } from '../user/dto/user';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/auth';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Req() req, @Res() res, @Body() body: LoginDTO) {
    const auth = await this.authService.login(body);
    res.status(auth.status).json(auth.data);
  }

  @Post('register')
  async register(@Req() req, @Res() res, @Body() body: CreateUserDTO) {
    const auth = await this.authService.register(body);
    res.status(auth.status).json(auth.data);
  }
}
