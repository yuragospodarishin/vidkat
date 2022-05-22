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

@ApiTags('transaction')
@Controller('transaction')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('/crediting')
  @ApiOkResponse({ status: 200, description: 'Create transaction', type: ITransactionCreditingOkResponse })
  @ApiBadRequestResponse({ status: 400, type: IBadRequestResponse })
  @ApiResponse({ status: 401, type: INotAuthorized })
  @ApiBody({ description: 'Create transaction request body', type: ITransactionCreditingRequestBody })
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async creditingBonuses(@Body() dto: CreateTransactionsDto): Promise<TransactionsDto> {
    return await this.transactionsService.saveTransaction(dto);
  }

  @Get('/all')
  @ApiOkResponse({ status: 200, description: 'Get all transactions', type: [ITransactionCreditingOkResponse] })
  @ApiBadRequestResponse({ status: 400, type: IBadRequestResponse })
  @ApiResponse({ status: 401, type: INotAuthorized })
  @UseGuards(JwtAuthGuard)
  async getAllUserTransactions(@User('id') userId: string): Promise<TransactionsDto[]> {
    return await this.transactionsService.getAllTransactionsById(userId);
  }

  @Get('/sum')
  @ApiOkResponse({ status: 200, description: 'Sum all user transactions', type: Number })
  @ApiBadRequestResponse({ status: 400, type: IBadRequestResponse })
  @ApiResponse({ status: 401, type: INotAuthorized })
  @UseGuards(JwtAuthGuard)
  async getSumAllUserTransactions(@User('id') userId: string): Promise<number> {
    return await this.transactionsService.getSumAllUserTransactions(userId);
  }
}
