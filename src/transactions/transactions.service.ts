import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { TransactionsRepository } from './transactions.repository';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionsRepository)
    private readonly bonusRepository: TransactionsRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async creditingBonuses(dto, userFromToken): Promise<any> {
    const user = await this.userRepository.findUserByEmail(userFromToken.email);

    return await this.bonusRepository.creditingBonuses(dto, user.id);
  }
}
