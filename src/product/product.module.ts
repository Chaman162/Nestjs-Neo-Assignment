import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductMiddleware } from 'src/common/middlewares/product.middleware';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product, ProductSchema } from './product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Product code validation
    consumer.apply(ProductMiddleware).forRoutes({
      path: 'Product/:ProductCode',
      method: RequestMethod.GET,
    });
  }
}
