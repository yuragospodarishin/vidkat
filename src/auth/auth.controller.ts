import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../user/dto/login.user.dto';
import { CreateUserDto } from '../user/dto/create.user.dto';
import { TokensDto } from './dto/tokens.dto';
import {
  IAuthOkResponseTokens,
  IAuthRequestBody,
  IBadRequestResponse,
  ILoginOkResponseTokens,
  ILoginRequestBody,
} from '../types/swagger.interfaces';

@ApiTags('authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/registration')
  @HttpCode(201)
  @ApiOkResponse({ description: 'Get tokens', status: 200, type: IAuthOkResponseTokens })
  @ApiBadRequestResponse({ status: 400, type: IBadRequestResponse })
  @ApiBody({ description: 'Authorization request body', type: IAuthRequestBody })
  async registration(@Body() dto: CreateUserDto): Promise<TokensDto> {
    return await this.authService.registration(dto);
  }

  @Post('/login')
  @HttpCode(200)
  @ApiOkResponse({ status: 200, description: 'Get tokens', type: ILoginOkResponseTokens })
  @ApiBadRequestResponse({ status: 400, type: IBadRequestResponse })
  @ApiBody({ description: 'Login request body', type: ILoginRequestBody })
  async login(@Body() dto: LoginUserDto): Promise<TokensDto> {
    return await this.authService.login(dto);
  }
}
