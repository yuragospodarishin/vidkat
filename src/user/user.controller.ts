import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @ApiOperation({ summary: 'Ban user', description: 'only admin ban user' })
  // @ApiResponse({ status: 200 })
  // @Post('/ban')
  // @UseGuards(JwtAuthGuard, RoleAuthGuard)
  // @Roles(RoleEnum.ADMIN)
  // async banUser(@Body() dto): Promise<UserDto> {
  //   return await this.userService.banUser(dto);
  // }
}
