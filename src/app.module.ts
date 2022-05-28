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
import { PostgresDBConfigService } from './ormconfig';
import { createConnection } from 'typeorm';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    UserModule,
    AuthModule,
    TransactionsModule,
    FeedbackModule,
    TypeOrmModule.forFeature([BaseEntity, TokensEntity, UserEntity, TransactionsEntity]),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   synchronize: true,
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   url: 'postgres://bncuyzyvhgornd:8267365c8e8d32fd983917069ae04ef33df1ab721e5b80993d6e19002eb4278d@ec2-54-228-218-84.eu-west-1.compute.amazonaws.com:5432/daoqc8oal2rmsh',
    //   ssl: {
    //     rejectUnauthorized: false,
    //   },
    //   // host: 'localhost',
    //   // port: 5433,
    //   // username: 'yura',
    //   // password: '0000',
    //   // database: 'vidkatapi',
    // }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresDBConfigService,
      inject: [PostgresDBConfigService, ConfigService],
      imports: [ConfigModule],
      connectionFactory: async (options) => {
        const connection = await createConnection(options);
        return connection;
      },
      // useFactory: () => ({
      //   // type: 'postgres',
      //   // synchronize: true,
      //   // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      //   // url: 'postgres://bncuyzyvhgornd:8267365c8e8d32fd983917069ae04ef33df1ab721e5b80993d6e19002eb4278d@ec2-54-228-218-84.eu-west-1.compute.amazonaws.com:5432/daoqc8oal2rmsh',
      //   // ssl: {
      //   //   rejectUnauthorized: false,
      //   // },
      //   // host: 'localhost',
      //   // port: 5433,
      //   // username: 'yura',
      //   // password: '0000',
      //   // database: 'vidkatapi',
      // }),
    }),
    ConfigModule.forRoot({
      envFilePath: ['./.env'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ConfigModule],
})
export class AppModule {}
