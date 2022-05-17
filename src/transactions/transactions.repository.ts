import { EntityRepository, getConnection, Repository } from 'typeorm';
import { TransactionsEntity } from './transactions.entity';
import { CreateTransactionsDto } from './dto/create.transactions.dto';

@EntityRepository(TransactionsEntity)
export class TransactionsRepository extends Repository<TransactionsEntity> {
  async creditingBonuses(dto: CreateTransactionsDto): Promise<any> {
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
  //
  // async getAllTransactions(dto): Promise<any>{
  //   return await getConnection()
  //     .createQueryBuilder()
  //     .select('transaction')
  //     .from(TransactionsEntity, 'transaction')
  //     .where('transaction.toUser = :toUser', { toUser: dto.toUser})
  //     .getMany();
  // }
}
