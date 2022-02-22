import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDTO } from './dto/user';
import { User } from './entity/user';

const GEN_SALT_ROUNDS = 10;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(params: CreateUserDTO): Promise<User> {
    const user = this.userRepository.create({
      email: params.email,
      firstName: params.first_name,
      lastName: params.last_name,
      passwordHash: bcrypt.hashSync(
        params.password,
        bcrypt.genSaltSync(GEN_SALT_ROUNDS),
      ),
    });

    return this.userRepository.save(user);
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
