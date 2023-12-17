import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();
const configService = new ConfigService();
const IS_DB_SSL_MODE = configService.getOrThrow<boolean>(
    'IS_DB_SSL_MODE',
    false,
);
//const IS_DB_SSL_MODE = true;
export default new DataSource({
    type: 'postgres',
    url: configService.get<string>('DB_URI', ''),
    ssl: IS_DB_SSL_MODE,
    extra: {
        ssl: IS_DB_SSL_MODE ? { rejectUnauthorized: false } : null,
    },
    migrations: ['src/migrations/*.ts'],
    migrationsRun: true,
    entities: ['**/*.entity.ts'],
});