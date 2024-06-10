import { Controller, Get, NotFoundException, Param, Post, Body, Put, Delete, UsePipes, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiTags,
  ApiBody
} from '@nestjs/swagger';
import { ProductService } from './product.service';
import {
  FindByCodeParams,
  FindByNameParams,
  CreateProduct,
  UpdateProduct
} from './product.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(
    private productService: ProductService
  ) {}


  /* API for Nest.js inbuilt support for passport.js */
  @ApiOperation({ description: 'Login User' })
  @ApiResponse({ status: 200, description: 'Get User Successfually' })
  @ApiBody({
    schema: {
        type: 'object',
        properties: {
          userId: { type: 'string' },
          username: { type: 'string' },
          password: { type: 'string' }
        },
      },
  })
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Body() body) {
    let newResponse = {
      body, msg : "User Validated Successfully"
    }
    return newResponse /* "User Validated Successfully" */;
  }

  @ApiOperation({ description: 'Create a product' })
  @ApiResponse({ status: 201, description: 'Product created successfually' })
  @ApiBody({
    schema: {
        type: 'object',
        properties: {
          code: { type: 'string' },
          name: { type: 'string' },
          abbr: { type: 'string' }
        },
      },
  })
  @Post()
  async create(@Body() body: CreateProduct) {
    return this.productService.create(body);
  }

  @ApiOperation({ description: 'Get all products.' })
  @ApiOkResponse({ description: 'Returns an array of products.' })
  @Get()
  async findAll(){
    return this.productService.findAll();
  }

  @ApiOperation({ description: 'Get a product.' })
  @ApiOkResponse({ description: 'Returns a product.' })
  @ApiBadRequestResponse({ description: 'When the code is invalid.' })
  @ApiNotFoundResponse({ description: 'When no products match the code.' })
  @ApiParam({
    name: 'code',
    type: 'string',
    description: 'The product code.',
    example: 'A',
  })
  @Get(':code')
  async findByCode(@Param() params: FindByCodeParams) {
    const { code } = params;
    const product = await this.productService.findByCode(code);

    // Result validation.
    if (product === null)
      throw new NotFoundException(`No product found with code '${code}'`);

    return product;
  }

  @ApiOperation({ description: 'Find products by its name.' })
  @ApiOkResponse({ description: 'Returns an array of product.' })
  @ApiBadRequestResponse({ description: 'When the name is invalid.' })
  @ApiParam({
    name: 'name',
    type: 'string',
    description: 'The product name.'
  })
  @Get('name/:name')
  async findByName(@Param() params: FindByNameParams){
    const { name } = params;
    return this.productService.findByName(name);
  }


  @ApiOperation({ description: 'Updated Product' })
  @ApiOkResponse({ description: 'Product updated successfually' })
  @ApiBody({
    schema: {
        type: 'object',
        properties: {
          code: { type: 'string' },
          name: { type: 'string' },
          abbr: { type: 'string' }
        },
      },
      required: false
  })
  @Put(':id')
  /* Use pipe for transformations */
  /* @UsePipes(parseInt) */ 
  async updateProduct(@Param('id') id: string, @Body() UpdateProduct){
    return this.productService.updateProduct(id, UpdateProduct)
  }


  @ApiOperation({ description: 'Delete Product' })
  @ApiOkResponse({ description: 'Product deleted successfually' })
  @Delete(':id')
  async deleteProduct(@Param('id') id: string){
    return this.productService.deleteProduct(id)
  }

 
}
