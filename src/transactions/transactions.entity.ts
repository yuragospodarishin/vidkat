import { Column, CreateDateColumn, Entity } from 'typeorm';
import { BaseEntity } from '../entitys/base.entity';

@Entity({ name: 'transactions' })
export class TransactionsEntity extends BaseEntity {
  @Column({ default: null })
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: '', nullable: true })
  notes: string;
}
