import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // Connect to MongoDB.
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_CONNECT_URI,
      }),
    }),
    ProductModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
