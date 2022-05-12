import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../entitys/base.entity';
import { UserEntity } from '../user/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tokens' })
export class TokensEntity extends BaseEntity {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RhMjIyMjJzZHRAZ21haWwuY29tIiwiaWQiOiI4ODRhZmJiZi00OTQxLTQzNmMtOWFiMC02ZjA3OGU0MDFkOGIiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2NTA4MzEyMDMsImV4cCI6MTY1MDg5MTIwM30.J1EULqYM-qbuQTFgHODsWWLNf5lbwUMUNHyUGHhGwNw',
    description: 'accessToken',
  })
  @Column()
  accessToken: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RhMjIyMjJzZHRAZ21haWwuY29tIiwiaWQiOiI4ODRhZmJiZi00OTQxLTQzNmMtOWFiMC02ZjA3OGU0MDFkOGIiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2NTA4MzEyMDMsImV4cCI6MTY1MDg5MTIwM30.J1EULqYM-qbuQTFgHODsWWLNf5lbwUMUNHyUGHhGwNw',
    description: 'refreshToken',
  })
  @Column()
  refreshToken: string;

  @ApiProperty({
    example: '1b028f0d-e031-4297-968c-0da0f95cee8e',
    description: 'userId',
  })
  @OneToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  userId: UserEntity;
}
