import { Column, CreateDateColumn, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../entitys/base.entity';
import { UserEntity } from '../user/user.entity';
import { TransactionAmountStatusEnum } from './enums/transaction.amount.status.enum';
import { TransactionTypeEnum } from './enums/transaction.type.enum';
import { TransactionStatusEnum } from './enums/transaction.status.enum';

@Entity({ name: 'transactions' })
export class TransactionsEntity extends BaseEntity {
  @Column({ default: null })
  amount: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @Column({ type: 'enum', enum: TransactionAmountStatusEnum, default: TransactionAmountStatusEnum.BLOCKED_BONUSES })
  amountStatus: TransactionAmountStatusEnum;

  @Column({ type: 'enum', enum: TransactionTypeEnum, default: null })
  type: TransactionTypeEnum;

  @Column({ type: 'enum', enum: TransactionStatusEnum, default: null })
  transactionStatus: TransactionStatusEnum;

  @Column({ default: '', nullable: true })
  notes: string;

  @ManyToOne(() => UserEntity, (user) => user.transactionsFromUser)
  fromUser: number;

  @ManyToOne(() => UserEntity, (user) => user.transactionsToUser)
  toUser: number;
}
