import { Column, Entity, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from '../entitys/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { TokensEntity } from '../auth/tokens.entity';
import { TransactionsEntity } from "../transactions/transactions.entity";

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  // @ApiProperty({ example: 'Vitaliy', description: 'user name' })
  @Column({ type: String, default: null })
  name: string;

  // @ApiProperty({ example: '+380639427123', description: 'user phone' })
  @Column({ type: String, unique: true, default: null })
  phone: string;

  // @ApiProperty({ example: 'user@gmail.com', description: 'email' })
  @Column({ type: String, unique: true })
  email: string;

  // @ApiProperty({ example: '1233password', description: 'password' })
  @Column({ type: String })
  password: string;

  @OneToMany(() => TransactionsEntity, (transaction) => transaction.id)
  transactionFromUser: TransactionsEntity[];

  @OneToMany(() => TransactionsEntity, (transaction) => transaction.id)
  transactionToUser: TransactionsEntity[];

  // @ApiProperty({ example: 'true', description: 'ban status' })
  @Column({ type: Boolean, default: false })
  banned: boolean;

  // @ApiProperty({ example: 'ban for anything', description: 'ban reason' })
  @Column({ type: String, default: null })
  banReason?: string;

  // @ApiProperty({ example: 'asd32e12dsad', description: 'user tokens' })
  @OneToOne(() => TokensEntity, (tokens) => tokens.id)
  tokens: TokensEntity;

  // @ApiProperty({ example: 'ADMIN', description: 'user role' })
  @Column({ type: String, default: null })
  role?: string;
}
