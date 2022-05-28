import { IsEnum, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';
import { UserEntity } from '../../user/user.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TransactionAmountStatusEnum } from '../enums/transaction.amount.status.enum';
import { TransactionTypeEnum } from '../enums/transaction.type.enum';
import { TransactionStatusEnum } from '../enums/transaction.status.enum';

export class TransactionsDto {
  @ApiPropertyOptional({
    example: '1',
    description: 'user ID,',
  })
  @IsOptional()
  fromUser: number;

  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty({ example: 21, description: 'transaction amount' })
  @IsNotEmpty({ message: 'amount must be not empty' })
  @IsNumber()
  @Min(1)
  amount: number;

  @ApiProperty({ type: TransactionAmountStatusEnum, example: 'active', description: 'amount status' })
  @IsNotEmpty()
  @IsEnum(TransactionAmountStatusEnum)
  amountStatus: TransactionAmountStatusEnum;

  @ApiProperty({ type: TransactionTypeEnum, example: 'personal', description: 'amount status' })
  @IsNotEmpty()
  @IsEnum(TransactionTypeEnum)
  type: TransactionTypeEnum;

  @ApiProperty({ type: TransactionStatusEnum, example: 'debet', description: 'amount status' })
  @IsNotEmpty()
  @IsEnum(TransactionStatusEnum)
  transactionStatus: TransactionStatusEnum;

  @ApiPropertyOptional({
    example: 'any notes',
    description: 'transaction notes',
  })
  @IsOptional()
  notes: string;

  @ApiProperty({
    example: 'any notes',
    description: 'transaction notes',
    type: () => UserEntity,
  })
  @IsNotEmpty({ message: 'toUser must be not empty' })
  toUser: number;
}
