import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';

import { UserService } from 'src/modules/user/user.service';
import { User } from 'src/modules/user/entity/user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: readFileSync('/opt/nest-lessons/app/keys/private.pem'),
    });
  }

  async validate(payload: any): Promise<User> {
    const user = await this.userService.findOne(payload.id);

    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}
