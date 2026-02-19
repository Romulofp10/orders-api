import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtStorePayload } from '../auth.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET ?? 'orders-api-secret-change-in-production',
    });
  }

  validate(payload: JwtStorePayload): JwtStorePayload {
    if (payload.type !== 'store' || !payload.sub) {
      throw new UnauthorizedException('Invalid token');
    }
    return payload;
  }
}
