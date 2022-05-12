import { EntityRepository, getConnection, Repository } from 'typeorm';
import { TokensEntity } from './tokens.entity';
import { TokensDto } from './dto/tokens.dto';
import { UserDto } from '../user/dto/user.dto';

@EntityRepository(TokensEntity)
export class AuthRepository extends Repository<TokensEntity> {
  async saveTokensInDB(tokens: TokensDto, user: UserDto): Promise<TokensDto> {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(TokensEntity)
      .values([
        {
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          userId: user,
        },
      ])
      .execute();

    return await this.findTokensByUserId(user.id);
  }

  async updateTokensInDB(tokens: TokensDto, user: UserDto): Promise<TokensDto> {
    await getConnection()
      .createQueryBuilder()
      .update(TokensEntity)
      .set({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      })
      .where('userId = :user', { user: user.id })
      .execute();

    return await this.findTokensByUserId(user.id);
  }

  async findTokensByUserId(id: string): Promise<TokensDto> {
    return await getConnection()
      .createQueryBuilder()
      .select('tokens')
      .from(TokensEntity, 'tokens')
      .where('tokens.userId = :id', { id: id })
      .getOne();
  }
}
