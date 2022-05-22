import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { TransactionsRepository } from './transactions.repository';
import { ErrorEnum } from '../enums/error.enum';
import { CreateTransactionsDto } from './dto/create.transactions.dto';
import { TransactionsEntity } from './transactions.entity';
import { plainToClass } from 'class-transformer';
import { TransactionsDto } from './dto/transaction.dto';
import { addDays } from 'date-fns';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionsRepository)
    private readonly transactionRepository: TransactionsRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async createTransAction(dto: CreateTransactionsDto): Promise<TransactionsDto> {
    const candidateToCrediting = await this.userRepository.findUserById(dto.toUser);

    if (!candidateToCrediting) {
      throw new BadRequestException(ErrorEnum.TO_USER_WITH_THIS_ID_NOT_FOUND);
    }

    const candidateWhoCrediting = await this.userRepository.findUserById(dto.fromUser);

    if (!candidateWhoCrediting) {
      const transaction = plainToClass(TransactionsEntity, {
        fromUser: null,
        amount: dto.amount,
        notes: dto.notes,
        toUser: dto.toUser,
      });

      const insertedTransaction = await this.transactionRepository.saveTransaction(transaction);

      const createdTransaction = await this.transactionRepository.findTransactionById(insertedTransaction.identifiers[0].id);

      return createdTransaction;
    }

    const balanceCandidateWhoCrediting = await this.getUserSumActiveBonuses(candidateWhoCrediting.id);
    if (balanceCandidateWhoCrediting < dto.amount) {
      throw new BadRequestException(ErrorEnum.NOT_ENOUGH_FUNDS_ON_BALANCE);
    }

    const insertedTransaction = await this.transactionRepository.saveTransaction(dto);

    return await this.transactionRepository.findTransactionById(insertedTransaction.identifiers[0].id);
  }

  async getAllTransactionsById(userId: string): Promise<TransactionsDto[]> {
    return await this.transactionRepository.getAllTransactionsById(userId);
  }

  async getUserSumActiveBonuses(userId: string): Promise<number> {
    const newDate = addDays(new Date(), -14);

    const sumTransactionsFromUser = await this.transactionRepository.getSumActiveBonusesFromUser(userId, newDate);

    const sumTransactionsToUser = await this.transactionRepository.getSumActiveBonusesToUser(userId, newDate);

    return sumTransactionsToUser - sumTransactionsFromUser;
  }

  async getUserSumBlockedBonuses(userId: string): Promise<number> {
    const newDate = addDays(new Date(), -14);

    const sumTransactionsFromUser = await this.transactionRepository.getSumBlockedBonusesFromUser(userId, newDate);

    const sumTransactionsToUser = await this.transactionRepository.getSumBlockedBonusesToUser(userId, newDate);

    return sumTransactionsToUser - sumTransactionsFromUser;
  }
}
