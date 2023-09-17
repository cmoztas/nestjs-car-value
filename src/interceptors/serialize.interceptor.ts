import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    console.log('Im running before the handler', context);

    return handler.handle().pipe(
      map((data: any) => {
        // run something before the response is sent out
        console.log('Im running before the response is sent out', data);
      })
    )
  }
}
