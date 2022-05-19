import { EntityRepository, getConnection, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { UserDto } from './dto/user.dto';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async saveUserInDB(dto: CreateUserDto): Promise<UserDto> {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values([
        {
          name: dto.name,
          phone: dto.phone,
          email: dto.email,
          password: dto.password,
          banReason: dto.banReason,
        },
      ])
      .execute();

    return await this.findUserByEmailAndPhone(dto.email, dto.phone);
  }

  async findUserByEmail(email: string): Promise<UserDto> {
    return await getConnection()
      .createQueryBuilder()
      .select('user')
      .from(UserEntity, 'user')
      .where('user.email = :email', { email: email })
      .getOne();
  }

  async findUserByEmailAndPhone(email: string, phone: string): Promise<UserDto> {
    return await getConnection()
      .createQueryBuilder()
      .select('user')
      .from(UserEntity, 'user')
      .where('user.email = :email OR user.phone = :phone ', {
        email: email,
        phone: phone,
      })
      .getOne();
  }

  async findUserById(id): Promise<UserDto> {
    try {
      return await getConnection()
        .createQueryBuilder()
        .select('user')
        .from(UserEntity, 'user')
        .where('user.id = :id', { id: id })
        .getOne();
    } catch (e) {
      console.log(e);
    }
  }

  async getUser(userId: string): Promise<UserDto> {
    return await getConnection()
      .createQueryBuilder()
      .select('user')
      .from(UserEntity, 'user')
      .where('user.id = :id', { id: userId })
      .getOne();
  }

  // async banUser(dto): Promise<UserDto> {
  //   await getConnection()
  //     .createQueryBuilder()
  //     .update(UserEntity)
  //     .set({ banned: true, banReason: dto.banReason })
  //     .where('id = :id', { id: dto.userId })
  //     .execute();
  //
  //   return await this.findUserById(dto.userId);
  // }
}
