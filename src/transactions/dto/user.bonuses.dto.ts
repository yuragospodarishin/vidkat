import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class UserBonusesDto {
  @ApiProperty({ example: 400, description: 'transaction total' })
  @IsNotEmpty({ message: 'total must be not empty' })
  @IsNumber()
  @Min(1)
  total: number;

  @ApiProperty({ example: 100, description: 'transaction personal' })
  @IsNotEmpty({ message: 'personal must be not empty' })
  @IsNumber()
  @Min(1)
  personal: number;

  @ApiProperty({ example: 100, description: 'transaction referral' })
  @IsNotEmpty({ message: 'referral must be not empty' })
  @IsNumber()
  @Min(1)
  referral: number;

  @ApiProperty({ example: 200, description: 'transaction extra' })
  @IsNotEmpty({ message: 'extra must be not empty' })
  @IsNumber()
  @Min(1)
  extra: number;
}
