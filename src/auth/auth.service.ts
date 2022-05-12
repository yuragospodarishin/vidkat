import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { LoginUserDto } from '../user/dto/login.user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { ErrorEnum } from '../enums/error.enum';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from './auth.repository';
import { TokensDto } from './dto/tokens.dto';
import { UserDto } from '../user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(AuthRepository)
    private readonly authRepository: AuthRepository,
  ) {}

  async registration(dto: CreateUserDto): Promise<TokensDto> {
    const candidate = await this.userRepository.findUserByEmailAndPhone(
      dto.email,
      dto.phone,
    );

    if (candidate) {
      throw new BadRequestException(ErrorEnum.EMAIL_OR_PHONE_IS_TAKEN);
    }

    const hashPassword = await bcrypt.hash(dto.password, 10);

    const newUser = await this.userRepository.saveUserInDB({
      ...dto,
      password: hashPassword,
    });

    const tokens = await this.generateTokens(newUser);

    await this.authRepository.saveTokensInDB(tokens, newUser);

    return tokens;
  }

  async login(dto: LoginUserDto): Promise<TokensDto> {
    const user = await this.validateUser(dto);

    const tokens = await this.generateTokens(user);

    await this.authRepository.updateTokensInDB(tokens, user);

    return tokens;
  }

  private async generateTokens(user: UserDto): Promise<TokensDto> {
    const payloadForAccessToken = {
      email: user.email,
      id: user.id,
      role: user.role,
    };

    const payloadForRefreshToken = {
      email: user.email,
      id: user.id,
      role: user.role,
    };

    return {
      accessToken: this.jwtService.sign(payloadForAccessToken),
      refreshToken: this.jwtService.sign(payloadForRefreshToken),
    };
  }

  private async validateUser(dto: LoginUserDto): Promise<UserDto> {
    const user = await this.userRepository.findUserByEmail(dto.email);

    if (!user) {
      throw new BadRequestException(ErrorEnum.CREDENTIALS_ARE_NOT_VALID);
    }

    const passwordEqual = await bcrypt.compare(dto.password, user.password);

    if (user && passwordEqual) {
      return user;
    }

    throw new UnauthorizedException(ErrorEnum.CREDENTIALS_ARE_NOT_VALID);
  }
}
