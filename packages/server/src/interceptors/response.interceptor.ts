import { CallHandler, ExecutionContext, HttpException, NestInterceptor } from "@nestjs/common";
import { Observable, catchError, map, of } from "rxjs";

export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map(data => ({
        code: 200,
        message: 'success',
        data,
      })),
      catchError(err => {
        if (err instanceof HttpException) {
          const httpError = err as HttpException
          return of({
            code: httpError.getStatus(),
            message: httpError.message,
          })
        } else {
          return of({
            code: 500,
            message: '服务器内部错误',
          })
        }
      })
    )
  }
}