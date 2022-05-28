import { EntityRepository, getConnection, InsertResult, Repository } from 'typeorm';
import { TransactionsEntity } from './transactions.entity';
import { CreateTransactionsDto } from './dto/create.transactions.dto';
import { TransactionsDto } from './dto/transaction.dto';
import { TransactionAmountStatusEnum } from './enums/transaction.amount.status.enum';

@EntityRepository(TransactionsEntity)
export class TransactionsRepository extends Repository<TransactionsEntity> {
  async saveTransaction(dto: CreateTransactionsDto): Promise<InsertResult> {
    return await getConnection()
      .createQueryBuilder()
      .insert()
      .into(TransactionsEntity)
      .values([
        {
          fromUser: null,
          amount: dto.amount,
          notes: dto.notes,
          toUser: dto.toUser,
          amountStatus: dto.amountStatus,
          type: dto.type,
          transactionStatus: dto.transactionStatus,
        },
      ])
      .execute();
  }

  async findTransactionById(id: string): Promise<TransactionsDto> {
    return await getConnection()
      .createQueryBuilder()
      .from(TransactionsEntity, 'transaction')
      .select('transaction')
      // .leftJoinAndSelect('transaction.fromUser', 'fromUser')
      // .leftJoinAndSelect('transaction.toUser', 'toUser')
      .where('transaction.id = :id', { id: id })
      .getOne();
  }

  async getAllTransactionsByUserId(userId: number): Promise<TransactionsDto[]> {
    return await getConnection()
      .createQueryBuilder()
      .select('transaction')
      .from(TransactionsEntity, 'transaction')
      .where('transaction.fromUser = :id OR transaction.toUser = :id', { id: userId })
      .getMany();
  }

  async getSumBlockedPersonalBonuses(userId: number, newDate: Date): Promise<number> {
    const sumPersonalUserBonuses = await getConnection()
      .createQueryBuilder()
      .select('SUM(transaction.amount)', 'sum')
      .from(TransactionsEntity, 'transaction')
      .where('transaction.toUser = :id', { id: userId })
      .andWhere('transaction.amountStatus = :amountStatus', { amountStatus: 'blocked' })
      .andWhere('transaction.createdAt > :date', { date: newDate })
      .andWhere('transaction.type = :type', { type: 'personal' })
      .getRawOne();

    return sumPersonalUserBonuses.sum * 1;
  }

  async getSumBlockedReferralBonuses(userId: number, newDate: Date): Promise<number> {
    const sumPersonalUserBonuses = await getConnection()
      .createQueryBuilder()
      .select('SUM(transaction.amount)', 'sum')
      .from(TransactionsEntity, 'transaction')
      .where('transaction.toUser = :id', { id: userId })
      .andWhere('transaction.amountStatus = :amountStatus', { amountStatus: 'blocked' })
      .andWhere('transaction.createdAt > :date', { date: newDate })
      .andWhere('transaction.type = :type', { type: 'referral' })
      .getRawOne();

    return sumPersonalUserBonuses.sum * 1;
  }

  async getSumBlockedExtraBonuses(userId: number, newDate: Date): Promise<number> {
    const sumPersonalUserBonuses = await getConnection()
      .createQueryBuilder()
      .select('SUM(transaction.amount)', 'sum')
      .from(TransactionsEntity, 'transaction')
      .where('transaction.toUser = :id', { id: userId })
      .andWhere('transaction.amountStatus = :amountStatus', { amountStatus: 'blocked' })
      .andWhere('transaction.createdAt > :date', { date: newDate })
      .andWhere('transaction.type = :type', { type: 'extra' })
      .getRawOne();

    return sumPersonalUserBonuses.sum * 1;
  }

  async getSumActivePersonalBonuses(userId: number, newDate: Date): Promise<number> {
    const sumPersonalUserBonuses = await getConnection()
      .createQueryBuilder()
      .select('SUM(transaction.amount)', 'sum')
      .from(TransactionsEntity, 'transaction')
      .where('transaction.toUser = :id', { id: userId })
      // .andWhere('transaction.amountStatus = :amountStatus', { amountStatus: 'active' })
      .andWhere('transaction.createdAt < :date', { date: newDate })
      .andWhere('transaction.type = :type', { type: 'personal' })
      .getRawOne();

    return sumPersonalUserBonuses.sum * 1;
  }

  async getSumActiveReferralBonuses(userId: number, newDate: Date): Promise<number> {
    const sumPersonalUserBonuses = await getConnection()
      .createQueryBuilder()
      .select('SUM(transaction.amount)', 'sum')
      .from(TransactionsEntity, 'transaction')
      .where('transaction.toUser = :id', { id: userId })
      // .andWhere('transaction.amountStatus = :amountStatus', { amountStatus: 'active' })
      .andWhere('transaction.createdAt < :date', { date: newDate })
      .andWhere('transaction.type = :type', { type: 'referral' })
      .getRawOne();

    return sumPersonalUserBonuses.sum * 1;
  }

  async getSumActiveExtraBonuses(userId: number, newDate: Date): Promise<number> {
    const sumPersonalUserBonuses = await getConnection()
      .createQueryBuilder()
      .select('SUM(transaction.amount)', 'sum')
      .from(TransactionsEntity, 'transaction')
      .where('transaction.toUser = :id', { id: userId })
      // .andWhere('transaction.amountStatus = :amountStatus', { amountStatus: 'active' })
      .andWhere('transaction.createdAt < :date', { date: newDate })
      .andWhere('transaction.type = :type', { type: 'extra' })
      .getRawOne();

    return sumPersonalUserBonuses.sum * 1;
  }

  async updateBonusStatusOnActive(newDate: Date) {
    await getConnection()
      .createQueryBuilder()
      .update(TransactionsEntity)
      .set({ amountStatus: TransactionAmountStatusEnum.ACTIVE_BONUSES })
      .where({ amountStatus: TransactionAmountStatusEnum.BLOCKED_BONUSES })
      .andWhere('createdAt < :date', { date: newDate })
      .execute();
  }
}
