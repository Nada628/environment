import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { LoaderService } from '../layout/services/loader.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class Intercepter implements HttpInterceptor {
  requestCount = 0;

  constructor(
    private loaderService: LoaderService,
    private toastr: ToastrService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!request.url.includes('sso/login')) {
      const token = localStorage.getItem('token');

      let headers;
      if (!request.url.includes('upload')) {
        headers = request.headers.set('Content-Type', 'application/json');
      }

      if (token && token.length > 7) {
        headers = request.headers.set('Authorization', 'Bearer ' + token);
      }
      request = request.clone({
        headers: headers,
      });
    }
    this.requestCount++;
    this.loaderService.show();
    return next.handle(request).pipe(
      finalize(() => {
        this.requestCount--;
        if (this.requestCount === 0) {
          this.loaderService.hide();
        }
      }),
      catchError((error) => {
        this.toastr.error('Error', error?.error.message);
        return throwError(error);
      })
    );
  }
}
