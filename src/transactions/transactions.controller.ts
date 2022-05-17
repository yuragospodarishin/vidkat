import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTransactionsDto } from './dto/create.transactions.dto';

@Controller('transaction')
export class TransactionsController {
  constructor(private readonly bonusService: TransactionsService) {}

  @Post('/crediting')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async creditingBonuses(@Body() dto: CreateTransactionsDto): Promise<any> {
    return await this.bonusService.creditingBonuses(dto);
  }
}
