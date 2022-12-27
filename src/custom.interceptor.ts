import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

export class CustomInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // THIS IS INTERCEPTING THE REQUEST

    return next.handle().pipe(
      // THIS IS INTERCEPTING THE RESPONSE
      map((data) => {
        const response = {
          ...data,
          createdAt: data.created_at,
        };

        delete response.created_at;
        delete response.updated_at;

        return response;
      }),
    );
  }
}
