import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { db } from './src/_shared_/config/env.config';

const ormconfig: TypeOrmModuleOptions = {
  ...db,
  type: 'postgres',
  port: 5432,
  entities: [
    __dirname + '/src/**/*.entity.js',
    __dirname + '/src/**/*.entity.ts',
  ],
  synchronize: db.sync,
  migrations: ['dist/src/db/migrations/*.js'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
  ssl: db.ssl
    ? {
        rejectUnauthorized: false,
      }
    : false,
};
export default ormconfig;
