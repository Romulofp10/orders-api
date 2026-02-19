import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtStorePayload } from '../auth.types';

export const StorePayload = createParamDecorator(
  (data: keyof JwtStorePayload | undefined, ctx: ExecutionContext): JwtStorePayload | unknown => {
    const request = ctx.switchToHttp().getRequest();
    const payload = request.user as JwtStorePayload;
    return data ? payload?.[data] : payload;
  },
);
