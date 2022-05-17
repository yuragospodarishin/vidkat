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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => {
        return {
          type: 'postgres',
          host: 'ec2-54-228-218-84.eu-west-1.compute.amazonaws.com',
          port: 5432,
          username: 'bncuyzyvhgornd',
          password:
            '8267365c8e8d32fd983917069ae04ef33df1ab721e5b80993d6e19002eb4278d',
          database: 'daoqc8oal2rmsh',
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
