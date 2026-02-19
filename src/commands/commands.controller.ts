import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { CommandsService } from './commands.service';
import { CreateCommandDto } from './dto/create-command.dto';
import { ListCommandsDto } from './dto/list-commands.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@Controller('commands')
export class CommandsController {
  constructor(private readonly commandsService: CommandsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCommandDto: CreateCommandDto) {
    return this.commandsService.create(createCommandDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(
    @Query() listCommandsDto: ListCommandsDto,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.commandsService.findAll(listCommandsDto, paginationDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.commandsService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.commandsService.remove(id);
    return { deleted: true };
  }
}
