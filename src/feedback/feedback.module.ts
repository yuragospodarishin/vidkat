import { Module } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { FeedbackRepository } from './feedback.repository';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [FeedbackController],
  providers: [FeedbackService, FeedbackRepository],
})
export class FeedbackModule {}
