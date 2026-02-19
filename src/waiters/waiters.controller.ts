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
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { WaitersService } from './waiters.service';
import { CreateWaiterDto } from './dto/create-waiter.dto';
import { UpdateWaiterDto } from './dto/update-waiter.dto';
import { SelectWaiterDto } from './dto/select-waiter.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { StorePayload } from '../auth/decorators/store-payload.decorator';
import { JwtStorePayload } from '../auth/auth.types';

@Controller('waiters')
export class WaitersController {
  constructor(private readonly waitersService: WaitersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createWaiterDto: CreateWaiterDto) {
    return this.waitersService.create(createWaiterDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  findAll(
    @StorePayload() payload: JwtStorePayload,
    @Query() selectWaiterDto: SelectWaiterDto,
    @Query() paginationDto: PaginationDto,
  ) {
    const store_id = selectWaiterDto.store_id ?? payload.sub;
    if (store_id !== payload.sub) {
      throw new ForbiddenException('Access limited to your store');
    }
    return this.waitersService.findAll(
      { ...selectWaiterDto, store_id },
      paginationDto,
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.waitersService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWaiterDto: UpdateWaiterDto,
  ) {
    return this.waitersService.update(id, updateWaiterDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.waitersService.remove(id);
    return { deleted: true };
  }
}
