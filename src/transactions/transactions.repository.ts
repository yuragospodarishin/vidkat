import { EntityRepository, getConnection, InsertResult, Repository } from 'typeorm';
import { TransactionsEntity } from './transactions.entity';
import { CreateTransactionsDto } from './dto/create.transactions.dto';
import { TransactionsDto } from './dto/transaction.dto';

@EntityRepository(TransactionsEntity)
export class TransactionsRepository extends Repository<TransactionsEntity> {
  async saveTransaction(dto: CreateTransactionsDto): Promise<InsertResult> {
    return await getConnection()
      .createQueryBuilder()
      .insert()
      .into(TransactionsEntity)
      .values([
        {
          fromUser: dto.fromUser,
          amount: dto.amount,
          notes: dto.notes,
          toUser: dto.toUser,
        },
      ])
      .execute();
  }

  async findTransactionById(id: string): Promise<TransactionsDto> {
    return await getConnection()
      .createQueryBuilder()
      .select('transaction')
      .from(TransactionsEntity, 'transaction')
      .where('transaction.id = :id', { id: id })
      .getOne();
  }

  async getAllTransactionsById(userId: string): Promise<TransactionsDto[]> {
    return await getConnection()
      .createQueryBuilder()
      .select('transaction')
      .from(TransactionsEntity, 'transaction')
      .where('transaction.fromUser = :id OR transaction.toUser = :id', { id: userId })
      .getMany();
  }

  async getSumAllUserTransactionsToUser(userId: string): Promise<number> {
    const objSumAllTransactionsToUser = await getConnection()
      .createQueryBuilder()
      .select('SUM(transaction.amount)', 'sum')
      .from(TransactionsEntity, 'transaction')
      .where('transaction.toUser = :id', { id: userId })
      .getRawOne();

    return objSumAllTransactionsToUser.sum * 1;
  }

  async getSumAllUserTransactionsFromUser(userId: string): Promise<number> {
    const objSumAllTransactionsFromUser = await getConnection()
      .createQueryBuilder()
      .select('SUM(transaction.amount)', 'sum')
      .from(TransactionsEntity, 'transaction')
      .where('transaction.fromUser = :id', { id: userId })
      .getRawOne();

    return objSumAllTransactionsFromUser.sum * 1;
  }
}
