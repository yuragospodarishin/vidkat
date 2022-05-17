import { IsNotEmpty, IsNumber, IsString, IsUUID, Min, UUIDVersion } from "class-validator";
import { UserEntity } from '../../user/user.entity';
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateTransactionsDto {

  @ApiPropertyOptional({ example: '1d096ca3-7a52-4cff-b999-1a44c1a17cdd', description: 'user ID,', type: () => UserEntity })
  fromUser: UserEntity;

  @ApiProperty({ example: 21, description: 'transaction amount' })
  @IsNotEmpty( { message: 'amount must be not empty'})
  @IsNumber()
  @Min(1)
  amount: number;

  @ApiPropertyOptional({ example: 'any notes', description: 'transaction notes' })
  notes?: string;

  @ApiProperty({ example: 'any notes', description: 'transaction notes', type: () => UserEntity })
  @IsNotEmpty({ message: 'toUser must be not empty'})
  @IsUUID()
  toUser: UserEntity;
}