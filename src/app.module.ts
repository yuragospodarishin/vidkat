import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TransactionsModule } from './transactions/transactions.module';
import { UserEntity } from './user/user.entity';
import { BaseEntity } from './entitys/base.entity';
import { TokensEntity } from './auth/tokens.entity';
import { TransactionsEntity } from './transactions/transactions.entity';
import { FeedbackModule } from './feedback/feedback.module';
import { ScheduleModule } from '@nestjs/schedule';
import { createConnection } from 'typeorm';
import { PostgresDBConfigServiceForDev } from './ormConfigForDev';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    UserModule,
    AuthModule,
    TransactionsModule,
    FeedbackModule,
    TypeOrmModule.forFeature([BaseEntity, TokensEntity, UserEntity, TransactionsEntity]),
    TypeOrmModule.forRootAsync({
      useClass: PostgresDBConfigServiceForDev,
      inject: [PostgresDBConfigServiceForDev, ConfigService],
      imports: [ConfigModule],
      connectionFactory: async (options) => {
        const connection = await createConnection(options);
        return connection;
      },
    }),
    ConfigModule.forRoot({
      envFilePath: ['./.development.env'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ConfigModule],
})
export class AppModule {}
