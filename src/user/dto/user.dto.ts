import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    example: 'Vitaliy',
    description: 'user name',
  })
  @IsNotEmpty({ message: 'name must be not empty' })
  @IsString({ message: 'name must be a string' })
  name: string;

  @ApiProperty({
    example: '+380639282111',
    description: 'user phone',
  })
  @IsNotEmpty({ message: 'phone must be not empty' })
  @IsString({ message: 'phone must be a string' })
  phone: string;

  @ApiProperty({
    example: '72c46802-f029-4aa9-854c-f64c74002cc9',
    description: 'uuid',
  })
  @IsNotEmpty({ message: 'id must be not empty' })
  @IsString({ message: 'id must be a string' })
  id: string;

  @ApiProperty({ example: 'user@gmail.com', description: 'email' })
  @IsNotEmpty({ message: 'email must be not empty' })
  @IsEmail({ message: 'email must be a email' })
  email: string;

  @ApiProperty({ example: 'password1234', description: 'password' })
  @IsNotEmpty({ message: 'password must be not empty' })
  @IsString({ message: 'password must be a string' })
  @Length(4, 16, { message: 'password must be min 4 and max 16 symbols' })
  password?: string;

  @ApiProperty({ example: 'true', description: 'banned' })
  @IsNotEmpty({ message: 'banned must be not empty' })
  @IsBoolean({ message: 'banned must be a boolean' })
  banned: boolean;

  @ApiProperty({ example: 'for misbehavior', description: 'banReason' })
  @IsNotEmpty({ message: 'banReason must be not empty' })
  banReason?: string;

  @ApiProperty({ example: 'ADMIN', description: 'role' })
  @IsNotEmpty({ message: 'role must be not empty' })
  @IsString({ message: 'role must be a string' })
  role?: string;

  amount?: number;
}
