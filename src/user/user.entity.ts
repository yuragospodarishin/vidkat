import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TokensEntity } from '../auth/tokens.entity';
import { TransactionsEntity } from '../transactions/transactions.entity';
import { FeedbackEntity } from '../feedback/feedback.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class UserEntity {
  @ApiProperty({ example: '1', description: 'id' })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, default: null })
  name: string;

  @Column({ type: String, unique: true, default: null })
  phone: string;

  @Column({ type: String, unique: true })
  email: string;

  @Column({ type: String })
  password: string;

  @OneToMany(() => TransactionsEntity, (transaction) => transaction.fromUser)
  transactionsFromUser: TransactionsEntity[];

  @OneToMany(() => TransactionsEntity, (transaction) => transaction.toUser)
  transactionsToUser: TransactionsEntity[];

  @OneToMany(() => FeedbackEntity, (feedback) => feedback.user)
  feedbacks: FeedbackEntity[];

  @Column({ type: Boolean, default: false })
  banned: boolean;

  @Column({ type: String, default: null })
  banReason?: string;

  @OneToOne(() => TokensEntity, (tokens) => tokens.userId)
  tokens: TokensEntity;

  @Column({ type: String, default: null })
  role?: string;
}
