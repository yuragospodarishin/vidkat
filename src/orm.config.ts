// import { Injectable } from '@nestjs/common';
// import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
//
// @Injectable()
// export class TypeOrmConfigService implements TypeOrmOptionsFactory {
//   createTypeOrmOptions(): TypeOrmModuleOptions {
//     return {
//       type: 'postgres',
//       host: 'localhost',
//       port: 5433,
//       username: 'yura',
//       password: '0000',
//       database: 'vidkatapi',
//       entities: [__dirname + '/**/*.entity{.ts,.js}'],
//       synchronize: true,
//     };
//   }
// }

import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PostgresDBConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('POSTGRES_HOST'),
      port: this.configService.get<number>('POSTGRES_PORT'),
      username: this.configService.get<string>('POSTGRES_USERNAME'),
      password: this.configService.get<string>('POSTGRES_PASSWORD'),
      database: this.configService.get<string>('POSTGRES_DB'),
      // entities: [__dirname + '//*.entity{.ts,.js}'],
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // entities: [__dirname + '/../**/*.entity.ts'],
      synchronize: true,
      migrations: [__dirname + '/migrations//*{.ts,.js}'],
      cli: {
        migrationsDir: 'src/migrations',
      },
    };
  }
}
