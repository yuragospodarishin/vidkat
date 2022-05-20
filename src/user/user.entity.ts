import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../entitys/base.entity';
import { TokensEntity } from '../auth/tokens.entity';
import { TransactionsEntity } from '../transactions/transactions.entity';
import { FeedbackEntity } from '../feedback/feedback.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column({ type: String, default: null })
  name: string;

  @Column({ type: String, unique: true, default: null })
  phone: string;

  @Column({ type: String, unique: true })
  email: string;

  @Column({ type: String })
  password: string;

  @OneToMany(() => TransactionsEntity, (transaction) => transaction.id)
  transactionFromUser: TransactionsEntity[];

  @OneToMany(() => TransactionsEntity, (transaction) => transaction.id)
  transactionToUser: TransactionsEntity[];

  @OneToMany(() => FeedbackEntity, (feedback) => feedback.user)
  feedbacks: FeedbackEntity[];

  @Column({ type: Boolean, default: false })
  banned: boolean;

  @Column({ type: String, default: null })
  banReason?: string;

  @OneToOne(() => TokensEntity, (tokens) => tokens.id)
  tokens: TokensEntity;

  @Column({ type: String, default: null })
  role?: string;
}
