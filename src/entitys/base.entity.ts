import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'base entity' })
export class BaseEntity {
  @ApiProperty({ example: '1', description: 'id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
