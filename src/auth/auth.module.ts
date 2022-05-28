import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'superpuper123nsad-12secret',
      signOptions: {
        expiresIn: '365d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthRepository, AuthService],
  exports: [AuthRepository, JwtModule],
})
export class AuthModule {}
