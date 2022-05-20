import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedbackRepository } from './feedback.repository';
import { UserEntity } from '../user/user.entity';
import { CreateFeedbackDto } from './dto/create.feedback.dto';
import { FeedbackDto } from './dto/feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(FeedbackRepository)
    private readonly feedbackRepository: FeedbackRepository,
  ) {}

  async createFeedback(dto: CreateFeedbackDto, user: UserEntity): Promise<FeedbackDto> {
    const insertedFeedback = await this.feedbackRepository.createFeedback(dto, user);

    const feedback = await this.feedbackRepository.getFeedbackById(insertedFeedback.identifiers[0].id);
    return feedback;
  }

  async getAllUserFeedback(userid: string): Promise<FeedbackDto[]> {
    return await this.feedbackRepository.getAllUserFeedback(userid);
  }
}
