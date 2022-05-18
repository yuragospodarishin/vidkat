import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TransactionsModule } from './transactions/transactions.module';
import { UserEntity } from './user/user.entity';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TransactionsModule,
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://bncuyzyvhgornd:8267365c8e8d32fd983917069ae04ef33df1ab721e5b80993d6e19002eb4278d@ec2-54-228-218-84.eu-west-1.compute.amazonaws.com:5432/daoqc8oal2rmsh',
      // host: 'localhost',
      // port: 5432,
      // username: 'vidkatapi',
      // password: '0000',
      // database: 'vidkatapi',
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // synchronize: true,
      ssl: {
        rejectUnauthorized: false,
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
