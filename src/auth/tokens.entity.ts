import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../entitys/base.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'tokens' })
export class TokensEntity extends BaseEntity {
  @Column()
  accessToken: string;

  @Column()
  refreshToken: string;

  @OneToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  userId: UserEntity;
}
