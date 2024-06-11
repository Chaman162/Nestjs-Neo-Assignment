import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from 'src/product/product.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './product/product.exception';
import { MiddlewareConsumer } from '@nestjs/common';
import { ProductMiddleware } from './common/middlewares/product.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // Connect to MongoDB.
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_CONNECT_URI')
      }),
      imports: [ConfigModule],
      inject: [ConfigService]
    }),
    ProductModule,
    AuthModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule { 
   // let's add a middleware on all routes
   configure(consumer: MiddlewareConsumer) {
    consumer.apply(ProductMiddleware).forRoutes('*');
  }
}
