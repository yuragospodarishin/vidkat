import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { TransactionsRepository } from './transactions.repository';
import { ErrorEnum } from '../enums/error.enum';
import { CreateTransactionsDto } from './dto/create.transactions.dto';
import { TransactionsEntity } from './transactions.entity';
import { plainToClass } from 'class-transformer';
import { TransactionsDto } from './dto/transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionsRepository)
    private readonly transactionRepository: TransactionsRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async saveTransaction(dto: CreateTransactionsDto): Promise<TransactionsDto> {
    const candidateToCrediting = await this.userRepository.findUserById(
      dto.toUser,
    );

    if (!candidateToCrediting) {
      throw new BadRequestException(ErrorEnum.TO_USER_WITH_THIS_ID_NOT_FOUND);
    }

    const candidateWhoCrediting = await this.userRepository.findUserById(
      dto.fromUser,
    );

    if (!candidateWhoCrediting) {
      const transaction = plainToClass(TransactionsEntity, {
        fromUser: null,
        amount: dto.amount,
        notes: dto.notes,
        toUser: dto.toUser,
      });

      const createdTransaction =
        await this.transactionRepository.saveTransaction(transaction);

      return await this.transactionRepository.findTransactionById(
        createdTransaction.identifiers[0].id,
      );
    }

    const createdTransaction = await this.transactionRepository.saveTransaction(
      dto,
    );

    return await this.transactionRepository.findTransactionById(
      createdTransaction.identifiers[0].id,
    );
  }
}
