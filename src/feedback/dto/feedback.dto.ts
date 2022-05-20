import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FeedbackDto {
  @ApiProperty({ description: 'id', example: '0c776412-ae22-4c16-9259-cdc8f205557d' })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ description: 'date', example: '2022-05-20T20:59:04.158Z' })
  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @ApiProperty({ description: 'any feedback', example: 'any feedback' })
  @IsNotEmpty()
  @IsString()
  feedback: string;
}
