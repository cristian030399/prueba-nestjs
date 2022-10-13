import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USER,
  DATABSE_HOST,
} from './config/constants';
import { ProductoModule } from './producto/producto.module';
import { Producto } from './producto/entities/producto.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get(DATABSE_HOST),
        port: +configService.get(DATABASE_PORT),
        username: configService.get(DATABASE_USER),
        password: configService.get(DATABASE_PASSWORD),
        database: configService.get(DATABASE_NAME),
        entities: [Producto],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ProductoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
