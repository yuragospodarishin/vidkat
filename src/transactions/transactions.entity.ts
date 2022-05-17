import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from '../entitys/base.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'transactions' })
export class TransactionsEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.id)
  fromUser: UserEntity;

  @Column({ default: null })
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: '', nullable: true })
  notes: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  toUser: UserEntity;
}
