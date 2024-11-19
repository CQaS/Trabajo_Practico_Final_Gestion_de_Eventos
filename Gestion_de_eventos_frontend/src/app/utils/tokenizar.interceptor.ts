import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MsjerrorService } from '../services/msjerror.service';

@Injectable()
export class TokenizarInterceptor implements HttpInterceptor {
  constructor(private router: Router, private _msjError: MsjerrorService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }

    return next.handle(request).pipe(
      catchError((e: HttpErrorResponse) => {
        if (e.status === 401) {
          this._msjError.msjErrors(e);
          this.router.navigate(['/login']);
        }
        return throwError(() => new Error('Error'));
      })
    );
  }
}
