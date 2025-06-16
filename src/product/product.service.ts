import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private ProductModel: Model<Product>,
  ) {}
  async createProduct(): Promise<Product> {
    const product = new this.ProductModel({
      title: 'Gaming Laptops',
      tags: [
        {
          name: 'Awesome',
        },
        {
          name: 'Wow',
        },
      ],
    });

    return product.save();
  }
  async getAllProducts(): Promise<Product[]> {
    return this.ProductModel.find();
  }
}
