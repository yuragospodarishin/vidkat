import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../user/dto/login.user.dto';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { TokensDto } from './dto/tokens.dto';

@ApiTags('authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'registration', description: 'user registration' })
  @ApiResponse({ status: 201, description: 'created' })
  @Post('/registration')
  async registration(@Body() dto: CreateUserDto): Promise<TokensDto> {
    return await this.authService.registration(dto);
  }

  @ApiOperation({ summary: 'login', description: 'login user' })
  @ApiResponse({ status: 200, description: 'ok' })
  @Post('/login')
  async login(@Body() dto: LoginUserDto): Promise<TokensDto> {
    return await this.authService.login(dto);
  }
}
