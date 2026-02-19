import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductAddOnsService } from './product-addons.service';
import { CreateProductAddOnDto } from './dto/create-product-addon.dto';
import { UpdateProductAddOnDto } from './dto/update-product-addon.dto';
import { ListProductAddOnsDto } from './dto/list-product-addons.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@Controller('product-addons')
export class ProductAddOnsController {
  constructor(private readonly productAddOnsService: ProductAddOnsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProductAddOnDto: CreateProductAddOnDto) {
    return this.productAddOnsService.create(createProductAddOnDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(
    @Query() listProductAddOnsDto: ListProductAddOnsDto,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.productAddOnsService.findAll(listProductAddOnsDto, paginationDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productAddOnsService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductAddOnDto: UpdateProductAddOnDto,
  ) {
    return this.productAddOnsService.update(id, updateProductAddOnDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.productAddOnsService.remove(id);
    return { deleted: true };
  }
}
