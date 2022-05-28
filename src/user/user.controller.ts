import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBadRequestResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './decorators/user.decorator';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IBadRequestResponse, INotAuthorized, IUserGetOkResponse } from '../types/swagger.interfaces';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/get')
  @ApiOkResponse({ status: 200, description: 'Get user', type: IUserGetOkResponse })
  @ApiBadRequestResponse({ status: 400, type: IBadRequestResponse })
  @ApiResponse({ status: 401, type: INotAuthorized })
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async getUser(@User('id') userId: number): Promise<UserDto> {
    return await this.userService.getUser(userId);
  }
  // @ApiOperation({ summary: 'Ban user', description: 'only admin ban user' })
  // @ApiResponse({ status: 200 })
  // @Post('/ban')
  // @UseGuards(JwtAuthGuard, RoleAuthGuard)
  // @Roles(RoleEnum.ADMIN)
  // async banUser(@Body() dto): Promise<UserDto> {
  //   return await this.userService.banUser(dto);
  // }
}
