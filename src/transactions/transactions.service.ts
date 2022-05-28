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
import { UserBonusesDto } from './dto/user.bonuses.dto';
import { Cron } from '@nestjs/schedule';

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
        amountStatus: dto.amountStatus,
        type: dto.type,
        transactionStatus: dto.transactionStatus,
      });

      const insertResult = await this.transactionRepository.saveTransaction(transaction);

      const createdTransaction = await this.transactionRepository.findTransactionById(insertResult.identifiers[0].id);

      return createdTransaction;
    }

    const balanceCandidateWhoCrediting = await this.getUserSumActiveBonuses(candidateWhoCrediting.id);

    if (balanceCandidateWhoCrediting.total < dto.amount) {
      throw new BadRequestException(ErrorEnum.NOT_ENOUGH_ACTIVE_BONUSES_ON_BALANCE);
    }

    const insertedTransaction = await this.transactionRepository.saveTransaction(dto);

    return await this.transactionRepository.findTransactionById(insertedTransaction.identifiers[0].id);
  }

  async getAllTransactionsById(userId: number): Promise<TransactionsDto[]> {
    return await this.transactionRepository.getAllTransactionsByUserId(userId);
  }

  async getUserSumBlockedBonuses(userId: number): Promise<UserBonusesDto> {
    const newDate = addDays(new Date(), -14);

    const sumBlockedPersonalBonuses = await this.transactionRepository.getSumBlockedPersonalBonuses(userId, newDate);

    const sumBlockedReferralBonuses = await this.transactionRepository.getSumBlockedReferralBonuses(userId, newDate);

    const sumBlockedExtraBonuses = await this.transactionRepository.getSumBlockedExtraBonuses(userId, newDate);

    const sumTotalBlockedBonuses = sumBlockedPersonalBonuses + sumBlockedReferralBonuses + sumBlockedExtraBonuses;

    const objBonuses = {
      total: sumTotalBlockedBonuses,
      personal: sumBlockedPersonalBonuses,
      referral: sumBlockedReferralBonuses,
      extra: sumBlockedExtraBonuses,
    };

    return objBonuses;
  }

  async getUserSumActiveBonuses(userId: number): Promise<UserBonusesDto> {
    const newDate = addDays(new Date(), -14);

    const sumActivePersonalBonuses = await this.transactionRepository.getSumActivePersonalBonuses(userId, newDate);

    const sumActiveReferralBonuses = await this.transactionRepository.getSumActiveReferralBonuses(userId, newDate);

    const sumActiveExtraBonuses = await this.transactionRepository.getSumActiveExtraBonuses(userId, newDate);

    const sumTotalActiveBonuses = sumActivePersonalBonuses + sumActiveReferralBonuses + sumActiveExtraBonuses;

    const objBonuses = {
      total: sumTotalActiveBonuses,
      personal: sumActivePersonalBonuses,
      referral: sumActiveReferralBonuses,
      extra: sumActiveExtraBonuses,
    };

    return objBonuses;
  }

  @Cron('0 0 * * * *')
  async updateBonusStatus() {
    const newDate = addDays(new Date(), -14);

    await this.transactionRepository.updateBonusStatusOnActive(newDate);
  }
}
