import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { UppercasePipe } from 'src/common/pipes/uppercase/uppercase.pipe';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  getProducts() {
    return this.productService.getAllProducts();
  }
  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productService.getProductById(Number(id));
  }
  @Post('custom-pipe')
  transformName(@Body('name', new UppercasePipe()) name: string) {
    return { message: `Recieved name ${name}` };
  }
}
