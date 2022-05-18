import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTransactionsDto } from './dto/create.transactions.dto';
import { TransactionsDto } from './dto/transaction.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('transactions')
@Controller('transaction')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('/crediting')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async creditingBonuses(@Body() dto: CreateTransactionsDto): Promise<TransactionsDto> {
    return await this.transactionsService.saveTransaction(dto);
  }
}
