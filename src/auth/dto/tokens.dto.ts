import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TokensDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RhMjIyMjJzZHRAZ21haWwuY29tIiwiaWQiOiI4ODRhZmJiZi00OTQxLTQzNmMtOWFiMC02ZjA3OGU0MDFkOGIiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2NTA4MzEyMDMsImV4cCI6MTY1MDg5MTIwM30.J1EULqYM-qbuQTFgHODsWWLNf5lbwUMUNHyUGHhGwNw',
    description: 'email',
  })
  @IsNotEmpty({ message: 'accessToken must be not empty' })
  @IsString({ message: 'accessToken must be a string' })
  accessToken: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RhMjIyMjJzZHRAZ21haWwuY29tIiwiaWQiOiI4ODRhZmJiZi00OTQxLTQzNmMtOWFiMC02ZjA3OGU0MDFkOGIiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2NTA4MzEyMDMsImV4cCI6MTY1MDg5MTIwM30.J1EULqYM-qbuQTFgHODsWWLNf5lbwUMUNHyUGHhGwNw',
    description: 'password',
  })
  @IsNotEmpty({ message: 'refreshToken must be not empty' })
  @IsString({ message: 'refreshToken must be a string' })
  refreshToken: string;
}
