import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();
const configService = new ConfigService();
const IS_DB_SSL_MODE = configService.getOrThrow<string>(
    'IS_DB_SSL_MODE',
    'false',
);

console.log([IS_DB_SSL_MODE]);

export default new DataSource({
    type: 'postgres',
    url: configService.get<string>('DB_URI', ''),
    //ssl: IS_DB_SSL_MODE,
    ssl: configService.getOrThrow<string>(
        'IS_DB_SSL_MODE',
        'false',
    ) == 'true',
    extra: {
        ssl: (configService.getOrThrow<string>(
            'IS_DB_SSL_MODE',
            'false',
        ) == 'true') ? { rejectUnauthorized: false } : null,
    },
    migrations: ['src/migrations/*.ts'],
    migrationsRun: true,
    entities: ['**/*.entity.ts'],
});