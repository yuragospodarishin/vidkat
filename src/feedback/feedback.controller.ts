import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { User } from '../user/decorators/user.decorator';
import { UserEntity } from '../user/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateFeedbackDto } from './dto/create.feedback.dto';
import { FeedbackDto } from './dto/feedback.dto';
import { ApiBadRequestResponse, ApiBody, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  IBadRequestResponse,
  IFeedbackCreateOkResponse,
  IFeedbackRequestBody,
  INotAuthorized,
} from '../types/swagger.interfaces';

@ApiTags('feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post('/create')
  @HttpCode(201)
  @ApiBody({ description: 'Create feedback request body', type: IFeedbackRequestBody })
  @ApiOkResponse({ status: 201, description: 'Create feedback', type: IFeedbackCreateOkResponse })
  @ApiBadRequestResponse({ status: 400, type: IBadRequestResponse })
  @ApiResponse({ status: 401, type: INotAuthorized })
  @UseGuards(JwtAuthGuard)
  async createFeedback(@Body() dto: CreateFeedbackDto, @User() user: UserEntity): Promise<FeedbackDto> {
    return await this.feedbackService.createFeedback(dto, user);
  }

  @Get('/all')
  @HttpCode(200)
  @ApiOkResponse({ status: 200, description: 'Create feedback', type: [IFeedbackCreateOkResponse] })
  @ApiBadRequestResponse({ status: 400, type: IBadRequestResponse })
  @ApiResponse({ status: 401, type: INotAuthorized })
  @UseGuards(JwtAuthGuard)
  async getAllUserFeedback(@User('id') userId: number): Promise<FeedbackDto[]> {
    return await this.feedbackService.getAllUserFeedback(userId);
  }
}
