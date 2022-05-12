import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'email' })
  @IsNotEmpty({ message: 'email must be not empty' })
  @IsEmail({}, { message: 'not correct email' })
  @IsString({ message: 'must be a string' })
  readonly email: string;

  @ApiProperty({ example: 'Password123', description: 'password' })
  @IsNotEmpty({ message: 'password must be not empty' })
  @IsString({ message: 'password must be a string' })
  @Length(4, 16, { message: 'password must be min 4 and max 16 symbols' })
  password: string;
}
