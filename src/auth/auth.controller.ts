import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { StoreAccessDto } from './dto/store-access.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('store-access')
  @HttpCode(HttpStatus.OK)
  storeAccess(@Body() storeAccessDto: StoreAccessDto) {
    return this.authService.storeAccess(storeAccessDto);
  }
}
