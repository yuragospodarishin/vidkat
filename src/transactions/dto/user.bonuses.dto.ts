import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class UserBonusesDto {
  @ApiProperty({ example: 13, description: 'transaction total' })
  @IsNotEmpty({ message: 'total must be not empty' })
  @IsNumber()
  @Min(1)
  total: number;

  @ApiProperty({ example: 13, description: 'transaction personal' })
  @IsNotEmpty({ message: 'personal must be not empty' })
  @IsNumber()
  @Min(1)
  personal: number;

  @ApiProperty({ example: 13, description: 'transaction referral' })
  @IsNotEmpty({ message: 'referral must be not empty' })
  @IsNumber()
  @Min(1)
  referral: number;

  @ApiProperty({ example: 13, description: 'transaction extra' })
  @IsNotEmpty({ message: 'extra must be not empty' })
  @IsNumber()
  @Min(1)
  extra: number;
}
