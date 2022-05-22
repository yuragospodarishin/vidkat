import {
  createQueryBuilder,
  EntityRepository,
  getConnection,
  getManager,
  getRepository,
  InsertResult,
  Repository,
} from 'typeorm';
import { FeedbackEntity } from './feedback.entity';
import { UserEntity } from '../user/user.entity';
import { CreateFeedbackDto } from './dto/create.feedback.dto';
import { FeedbackDto } from './dto/feedback.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';

@EntityRepository(FeedbackEntity)
export class FeedbackRepository extends Repository<FeedbackEntity> {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {
    super();
  }

  async createFeedback(dto: CreateFeedbackDto, user: UserEntity): Promise<InsertResult> {
    return await getConnection()
      .createQueryBuilder()
      .insert()
      .into(FeedbackEntity)
      .values([
        {
          feedback: dto.feedback,
          user: user,
        },
      ])
      .execute();
  }

  async getFeedbackById(id: string): Promise<FeedbackDto> {
    return await getConnection()
      .createQueryBuilder()
      .select('feedback')
      .from(FeedbackEntity, 'feedback')
      .where('feedback.id = :id', { id: id })
      .getOne();
  }

  async getAllUserFeedback(userId: string): Promise<any> {
    return await getConnection()
      .createQueryBuilder()
      .select('feedback')
      .from(FeedbackEntity, 'feedback')
      .where('feedback.userId = :userId', { userId: userId })
      .getMany();
  }
}
