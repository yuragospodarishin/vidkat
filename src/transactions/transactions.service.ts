import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { TransactionsRepository } from './transactions.repository';
import { ErrorEnum } from '../enums/error.enum';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionsRepository)
    private readonly bonusRepository: TransactionsRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async creditingBonuses(dto): Promise<any> {

    const candidateToCrediting = await this.userRepository.findUserById(
      dto.toUser,
    );

    if (!candidateToCrediting) {
      throw new BadRequestException(ErrorEnum.USER_FOR_CREDITING_NOT_FOUND);
    }

    return await this.bonusRepository.creditingBonuses(dto);
  }
}
