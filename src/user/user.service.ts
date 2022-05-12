import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async banUser(dto): Promise<UserDto> {
    const bannedUser = await this.userRepository.banUser(dto);
    delete bannedUser.password;
    return bannedUser;
  }
}
