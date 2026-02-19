import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAddOn } from './entities/product-addon.entity';
import { ProductAddOnsController } from './product-addons.controller';
import { ProductAddOnsService } from './product-addons.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductAddOn])],
  controllers: [ProductAddOnsController],
  providers: [ProductAddOnsService],
  exports: [ProductAddOnsService],
})
export class ProductAddOnsModule {}
