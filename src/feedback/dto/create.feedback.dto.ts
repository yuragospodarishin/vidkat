import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFeedbackDto {
  @ApiProperty({ description: 'any feedback', example: 'any feedback' })
  @IsNotEmpty()
  feedback: string;
}
