import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { CreateUserDTO } from '../user/dto/user';
import { UserService } from '../user/user.service';
import { LoginDTO } from './dto/auth';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(params: LoginDTO): Promise<Record<string, any>> {
    try {
      const user = await this.userService.findByEmail(params.email);
      if (!user) {
        return {
          status: HttpStatus.BAD_REQUEST,
          data: { msg: 'invalid credentials' },
        };
      }

      const isValidPassword = bcrypt.compareSync(
        params.password,
        user.passwordHash,
      );

      if (!isValidPassword) {
        return {
          status: HttpStatus.BAD_REQUEST,
          data: { msg: 'invalid credentials' },
        };
      }

      return {
        status: HttpStatus.OK,
        data: {
          id: user.id,
          token: this.jwtService.sign({ id: user.id }),
        },
      };
    } catch (e) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        data: { msg: 'internal server error' },
      };
    }
  }

  async register(params: CreateUserDTO): Promise<Record<string, any>> {
    try {
      const user = await this.userService.create(params);
      return { status: HttpStatus.CREATED, data: user };
    } catch (e) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        data: { msg: 'internal server error' },
      };
    }
  }
}
