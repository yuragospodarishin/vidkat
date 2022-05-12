import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { User } from '../user/decorators/user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('transaction')
export class TransactionsController {
  constructor(private readonly bonusService: TransactionsService) {}

  @Post('/crediting')
  @UseGuards(JwtAuthGuard)
  async creditingBonuses(@Body() dto, @User() user): Promise<any> {
    return await this.bonusService.creditingBonuses(dto, user);
  }
}
