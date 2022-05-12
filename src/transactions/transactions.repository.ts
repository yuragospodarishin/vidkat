import { EntityRepository, getConnection, Repository } from 'typeorm';
import { TransactionsEntity } from './transactions.entity';

@EntityRepository(TransactionsEntity)
export class TransactionsRepository extends Repository<TransactionsEntity> {
  async creditingBonuses(dto, id): Promise<any> {
    return await getConnection()
      .createQueryBuilder()
      .insert()
      .into(TransactionsEntity)
      .values([
        {
          amount: dto.amount,
          notes: dto.notes,
        },
      ])
      .execute();
  }
}
