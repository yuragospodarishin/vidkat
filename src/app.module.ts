import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TransactionsModule } from './transactions/transactions.module';
import { TokensEntity } from './auth/tokens.entity';
import { TransactionsEntity } from './transactions/transactions.entity';
import { UserEntity } from './user/user.entity';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TransactionsModule,
    TypeOrmModule.forFeature([
      UserEntity,
    ]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => {
        return {
          type: 'postgres',
          host: process.env.POSTGRES_HOST,
          port: Number(process.env.POSTGRES_PORT),
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
        };
      },
    }),
    ConfigModule.forRoot({
      envFilePath: ['./.env'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ConfigModule],
})
export class AppModule {}
