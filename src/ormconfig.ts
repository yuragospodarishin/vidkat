import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PostgresDBConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      url: 'postgres://bncuyzyvhgornd:8267365c8e8d32fd983917069ae04ef33df1ab721e5b80993d6e19002eb4278d@ec2-54-228-218-84.eu-west-1.compute.amazonaws.com:5432/daoqc8oal2rmsh',
      ssl: {
        rejectUnauthorized: false,
      },
      // host: this.configService.get<string>('POSTGRES_HOST'),
      // port: this.configService.get<number>('POSTGRES_PORT'),
      // username: this.configService.get<string>('POSTGRES_USERNAME'),
      // password: this.configService.get<string>('POSTGRES_PASSWORD'),
      // database: this.configService.get<string>('POSTGRES_DB'),
    };
  }
}
