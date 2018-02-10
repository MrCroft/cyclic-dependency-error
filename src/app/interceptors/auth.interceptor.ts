import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../services/auth.service';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    const reqCopy = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${token}`)
    });
    return next.handle(reqCopy)
      .catch((err: any, caught) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 403) {
            this.authService.logOut();
          }
          return Observable.throw(err);
        }
      });
  }

}
