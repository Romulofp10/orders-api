import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    total_pages?: number;
  };
}

@Injectable()
export class ResponseWrapperInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((data) => {
        if (data && typeof data === 'object' && 'data' in data && 'success' in data) {
          return data as ApiResponse<T>;
        }

        const result: ApiResponse<T> = {
          data,
          success: true,
        };

        if (data && typeof data === 'object' && 'meta' in data) {
          result.meta = (data as { meta?: ApiResponse<T>['meta'] }).meta;
        }

        return result;
      }),
    );
  }
}
