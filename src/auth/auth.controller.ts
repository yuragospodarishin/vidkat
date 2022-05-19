import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../user/dto/login.user.dto';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { TokensDto } from './dto/tokens.dto';
import {
  IAuthBadRequestBody,
  IAuthOkResponseTokens,
  IAuthRequestBody,
  ILoginBadRequestBody,
  ILoginOkResponseTokens,
  ILoginRequestBody,
} from '../types/swagger.interfaces';

@ApiTags('authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({ description: 'Get tokens', status: 200, type: IAuthOkResponseTokens })
  @ApiBadRequestResponse({ status: 400, type: IAuthBadRequestBody })
  @ApiBody({ description: 'Authorization request body', type: IAuthRequestBody })
  @Post('/registration')
  @HttpCode(201)
  async registration(@Body() dto: CreateUserDto): Promise<TokensDto> {
    return await this.authService.registration(dto);
  }

  @ApiOkResponse({ description: 'Get tokens', type: ILoginOkResponseTokens })
  @ApiBadRequestResponse({ status: 400, type: ILoginBadRequestBody })
  @ApiBody({ description: 'Login request body', type: ILoginRequestBody })
  @HttpCode(200)
  @Post('/login')
  async login(@Body() dto: LoginUserDto): Promise<TokensDto> {
    return await this.authService.login(dto);
  }
}
