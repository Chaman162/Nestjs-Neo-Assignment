import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

/**
 * Schema for products collection.
 */
@Schema({ collection: 'product' })
export class Product {
  @Prop()
  code: string;
  @Prop()
  name: string;
  @Prop()
  abbr: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
