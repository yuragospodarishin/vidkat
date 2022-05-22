import { IsEmail, IsMobilePhone, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Vitaliy', description: 'user name' })
  @IsNotEmpty({ message: 'name must be not empty' })
  @IsString({ message: 'name must be a string' })
  @Length(3, 13, { message: 'name must be min 3 and max 16 symbols' })
  name: string;

  @ApiProperty({ example: '380639458213', description: 'user phone' })
  @IsNotEmpty({ message: 'phone must be not empty' })
  @IsMobilePhone()
  phone: string;

  @ApiProperty({ example: 'user@gmail.com', description: 'email' })
  @IsNotEmpty({ message: 'email must be not empty' })
  @IsEmail({}, { message: 'email must be a email' })
  @IsString({ message: 'email must be a string' })
  readonly email: string;

  @ApiProperty({ example: 'password1234', description: 'password' })
  @IsNotEmpty({ message: 'password must be not empty' })
  @IsString({ message: 'password must be a string' })
  // @Length(8, 16, { message: 'password must be min 8 and max 16 symbols' })
  password: string;

  banReason?: string;

  amount?: number;

  // @ApiProperty({ example: 'ADMIN', description: 'role' })
  // @IsNotEmpty({ message: 'role must be not empty' })
  // @IsEnum(RoleEnum, { message: 'role must be a role enum' })
  // @IsString({ message: 'role must be a string' })
  // role?: RoleEnum;
}
