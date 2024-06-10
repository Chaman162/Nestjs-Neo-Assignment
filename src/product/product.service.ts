import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}


  /**
   * Create new product.
   * @returns The product
   */
  async create(productData) {
    const createdProduct = new this.productModel(productData);
    return createdProduct.save();
  }

  /**
   * Get all product.
   * @returns The product
   */
  async findAll(){
    return this.productModel.find({}, {"__v": 0}).exec();
  }

  /**
   * Get a product by its code.
   * @param productCode The product code.
   * @returns The product.
   */
  async findByCode(productCode: string) {
    return this.productModel
      .findOne({ code: productCode.toUpperCase()}, {"__v": 0})
      .exec();
  }

  /**
   * Find products by its name.
   * Perform product search using case-insensitive regex.
   * @param productName The product name.
   * @returns The suitable product.
   */
  async findByName(productName: string){
    return this.productModel
      .find({ name: new RegExp(productName, 'i') }, {"__v": 0})
      .exec();
  }

   /**
   * Update product.
   * @returns The product
   */
  async updateProduct(id: string, CreateProduct){
    console.log(id, "CreateProduct------------  ",CreateProduct)
    return await this.productModel.findByIdAndUpdate(id, CreateProduct, { new: true });
  }

   /**
   * Delete product.
   * @returns The product
   */
  async deleteProduct(id: string){
    return await this.productModel.findByIdAndRemove(id);
  }

}
