import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';

interface FindDto {
  message: 200;
}

@Controller('users')
export class UsersController {
  @Get('list')
  @HttpCode(HttpStatus.FOUND)
  findAll(@Res() response: FindDto) {
    return response;
  }

  @Get('find/:id')
  findOne(@Param() params: { id: string }) {
    return `Usuario ${params.id} ${params.id}`;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUsersDto: CreateUsersDto) {
    return `Usuario ${createUsersDto.email} criado com sucesso`;
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  update(@Body() updateUser: UpdateUsersDto) {
    return `Usuario ${updateUser.email, updateUser.password} atualizado com sucesso`;
  }
}
