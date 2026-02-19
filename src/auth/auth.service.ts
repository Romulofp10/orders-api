import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from '../stores/entities/store.entity';
import { StoreAccessDto } from './dto/store-access.dto';
import { JwtStorePayload } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
    private readonly jwtService: JwtService,
  ) {}

  async storeAccess(storeAccessDto: StoreAccessDto): Promise<{ access_token: string }> {
    const store = await this.storeRepository.findOne({
      where: {
        code: storeAccessDto.code,
        slug: storeAccessDto.slug,
      },
    });

    if (!store) {
      throw new UnauthorizedException('Invalid code or slug');
    }

    const payload: JwtStorePayload = {
      sub: store.id,
      slug: store.slug,
      type: 'store',
    };

    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }
}
