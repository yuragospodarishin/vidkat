import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserEntity } from '../user/user.entity';

export class IAuthOkResponseTokens {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ik......pbCI6IjFAZ' })
  accessToken: string;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ik......pbCI6IjFAZ' })
  refreshToken: string;
}

export class IAuthRequestBody {
  @ApiProperty({ example: 'Vitaliy' })
  name: string;

  @ApiProperty({ example: '+380965854888' })
  phone: string;

  @ApiProperty({ example: 'vidkatapi@gmail.com' })
  email: string;

  @ApiProperty({ example: '13Vitaliy13' })
  password: string;
}

export class ILoginOkResponseTokens {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ik......pbCI6IjFAZ' })
  accessToken: string;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ik......pbCI6IjFAZ' })
  refreshToken: string;
}

export class ILoginRequestBody {
  @ApiProperty({ example: 'vidkatapi@gmail.com' })
  email: string;

  @ApiProperty({ example: '13Vitaliy13' })
  password: string;
}

export class ITransactionCreditingRequestBody {
  @ApiPropertyOptional({ type: UserEntity, example: '4afa8709-ac00-483c-8eb3-fe22aa6d578d' })
  fromUser: UserEntity;

  @ApiProperty({ example: 133 })
  amount: number;

  @ApiPropertyOptional({ example: 'any notes' })
  notes: string;

  @ApiProperty({ type: UserEntity, example: '3bca8709-ac00-483c-8eb3-fe22aa6d599j' })
  toUser: UserEntity;
}
export class ITransactionCreditingOkResponse {
  @ApiProperty({ example: '739c1aa1-485b-42f8-8273-f054f8ef1afb' })
  id: string;

  @ApiProperty({ example: 133 })
  amount: number;

  @ApiProperty({ example: '2022-05-19T20:57:28.932Z' })
  createdAt: Date;

  @ApiPropertyOptional({ example: 'any notes' })
  notes: string;
}

export class INotAuthorized {
  @ApiPropertyOptional({ example: 401 })
  statusCode: 401;

  @ApiPropertyOptional({ example: 'Not authorized' })
  message: string;

  @ApiPropertyOptional({ example: 'Unauthorized' })
  error: string;
}

export class IUserGetOkResponse {
  @ApiProperty({ example: '4afa8709-ac00-483c-8eb3-fe22aa6d578d' })
  id: string;

  @ApiProperty({ example: 'Vitaliy' })
  name: string;

  @ApiProperty({ example: '+380965728272' })
  phone: string;

  @ApiProperty({ example: 'vidkatapi@gmail.com' })
  email: string;
}

export class IFeedbackRequestBody {
  @ApiProperty({ example: 'any feedback' })
  feedback: string;
}

export class IFeedbackCreateOkResponse {
  @ApiProperty({ example: '8ad3f37f-eef4-4f27-b1ac-10f4b3beaeb3' })
  id: string;

  @ApiProperty({ example: '2022-05-20T20:45:23.745Z' })
  createdAt: Date;

  @ApiProperty({ example: 'any feedback' })
  feedback: string;
}

export class IBadRequestResponse {
  @ApiPropertyOptional({ example: 400 })
  statusCode: 400;

  @ApiPropertyOptional({ example: 'Any error message' })
  message: string;

  @ApiPropertyOptional({ example: 'Bad request' })
  error: string;
}
