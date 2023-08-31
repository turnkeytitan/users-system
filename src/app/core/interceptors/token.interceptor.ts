import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token') || null;
    if (!token) {
      return next.handle(request);
    }
    const modifiedRequest = request.clone({
      setHeaders: {
        Authorization: token,
      },
    });
    return next.handle(modifiedRequest);
  }
}
