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
      url: this.configService.get<string>('URL_DB_STAGE'),
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
      // host: this.configService.get<string>('POSTGRES_HOST'),
      // port: this.configService.get<number>('POSTGRES_PORT'),
      // username: this.configService.get<string>('POSTGRES_USERNAME'),
      // password: this.configService.get<string>('POSTGRES_PASSWORD'),
      // database: this.configService.get<string>('POSTGRES_DB'),
    };
  }
}
