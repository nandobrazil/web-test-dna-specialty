import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import * as _ from 'lodash';

import { Router } from '@angular/router';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(
    private messageService: MessageService,
    private router: Router
  ) {
  }

intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ) {
    const headers =
      new HttpHeaders({
        ... { 'Content-Type': 'application/json' }
      });
    req = req.clone({ headers });
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          const cloneEvent = event.clone({
            body: event.body
          });
          return cloneEvent;
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if ([422, 404, 400].includes(error.status)) {
          if (error?.error instanceof Array) {
            this.messageService.add({
              summary: 'Erro',
              severity: 'warn',
              detail: 'Não foi possível processar sua solicitação.'
            });
          } else {
            this.messageService.add({
              summary: 'Erro',
              severity: 'warn',
              detail: error?.error?.error || 'Não foi possível processar sua solicitação.'
            });
          }
        } else if (error.status === 403 || error.status === 401) {
          this.router.navigate(['/login']);
        } else {
          this.messageService.add({
            summary: 'Erro',
            severity: 'warn',
            detail: error?.error?.error || 'Não foi possível processar sua solicitação.'
          });
        }
        return of(new HttpResponse({
          body: {
            success: false,
            data: error?.error,
            message: error?.error?.error || error?.message,
          }
        }));
      })
    );
  }
}
