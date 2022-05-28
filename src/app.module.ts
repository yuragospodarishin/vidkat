import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostgresDBConfigService } from './ormconfig';
import { TokensEntity } from './auth/tokens.entity';
import { UserEntity } from './user/user.entity';
import { TransactionsEntity } from './transactions/transactions.entity';
import { FeedbackEntity } from './feedback/feedback.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FeedbackModule } from './feedback/feedback.module';
import { TransactionsModule } from './transactions/transactions.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    AuthModule,
    UserModule,
    FeedbackModule,
    TransactionsModule,
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([TokensEntity, UserEntity, TransactionsEntity, FeedbackEntity]),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresDBConfigService,
      inject: [PostgresDBConfigService, ConfigService],
      imports: [ConfigModule],
    }),
  ],
})
export class AppModule {}
