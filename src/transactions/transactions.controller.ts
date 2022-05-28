import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTransactionsDto } from './dto/create.transactions.dto';
import { TransactionsDto } from './dto/transaction.dto';
import { ApiBadRequestResponse, ApiBody, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../user/decorators/user.decorator';
import {
  IBadRequestResponse,
  INotAuthorized,
  ITransactionCreditingOkResponse,
  ITransactionCreditingRequestBody,
} from '../types/swagger.interfaces';
import { UserBonusesDto } from './dto/user.bonuses.dto';

@ApiTags('transaction')
@Controller('transaction')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('/crediting')
  @HttpCode(201)
  @ApiOkResponse({ status: 200, description: 'Create transaction', type: ITransactionCreditingOkResponse })
  @ApiBadRequestResponse({ status: 400, type: IBadRequestResponse })
  @ApiResponse({ status: 401, type: INotAuthorized })
  @ApiBody({ description: 'Create transaction request body', type: ITransactionCreditingRequestBody })
  @UseGuards(JwtAuthGuard)
  async creditingBonuses(@Body() dto: CreateTransactionsDto): Promise<TransactionsDto> {
    return await this.transactionsService.createTransAction(dto);
  }

  @Get('/all')
  @HttpCode(200)
  @ApiOkResponse({ status: 200, description: 'Get all transactions', type: [ITransactionCreditingOkResponse] })
  @ApiBadRequestResponse({ status: 400, type: IBadRequestResponse })
  @ApiResponse({ status: 401, type: INotAuthorized })
  @UseGuards(JwtAuthGuard)
  async getAllUserTransactions(@User('id') userId: number): Promise<TransactionsDto[]> {
    return await this.transactionsService.getAllTransactionsById(userId);
  }

  @Get('/blocked/bonuses')
  @HttpCode(200)
  @ApiOkResponse({ status: 200, description: 'Sum blocked bonuses in user', type: UserBonusesDto })
  @ApiBadRequestResponse({ status: 400, type: IBadRequestResponse })
  @ApiResponse({ status: 401, type: INotAuthorized })
  @UseGuards(JwtAuthGuard)
  async getUserSumBlockedBonuses(@User('id') userId: number): Promise<UserBonusesDto> {
    return await this.transactionsService.getUserSumBlockedBonuses(userId);
  }

  @Get('/active/bonuses')
  @HttpCode(200)
  @ApiOkResponse({ status: 200, description: 'Sum active bonuses in user', type: UserBonusesDto })
  @ApiBadRequestResponse({ status: 400, type: IBadRequestResponse })
  @ApiResponse({ status: 401, type: INotAuthorized })
  @UseGuards(JwtAuthGuard)
  async getUserSumActiveBonuses(@User('id') userId: number): Promise<UserBonusesDto> {
    return await this.transactionsService.getUserSumActiveBonuses(userId);
  }
}
