import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UuidModule } from '@app/uuid/uuid.module';
import { ClockModule } from '@app/clock/clock.module';
import { BcryptModule } from '@app/bcrypt/bcrypt.module';
import { AuthModule } from './auth/auth.module';
import { DogModule } from './dog/dog.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guard/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DB_URI: Joi.string().required(),
        IS_DB_SSL_MODE: Joi.boolean().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      useFactory(configService: ConfigService) {
        const IS_DB_SSL_MODE = configService.getOrThrow<string>(
          'IS_DB_SSL_MODE',
          'false',
        );
        //const IS_DB_SSL_MODE = false;

        return {
          ssl: IS_DB_SSL_MODE == 'true', // 是否要使用 ssl 連線，一般正式連線會啟用
          extra: {
            ssl: (IS_DB_SSL_MODE == 'true') ? { rejectUnauthorized: false } : null,
            poolSize: 5,
            idleTimeoutMillis: 3600000,
          },
          type: 'postgres',//連線資料庫的類型
          url: configService.getOrThrow('DB_URI', ''),
          synchronize: false,//否自動同步 entity 到資料庫 table
          autoLoadEntities: true//是否自動載入 Entity 到 forRoot TypeORM
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    ClockModule,
    UuidModule,
    BcryptModule,
    AuthModule,
    DogModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
})
export class AppModule { }
