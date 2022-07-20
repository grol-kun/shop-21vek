import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class TokenInterseptorService implements HttpInterceptor {

  constructor(
    private authServise: AuthService,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authServise.hasToken()) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authServise.getToken()}`
        }
      });
    }
    return next.handle(req)/* .pipe(
      catchError(
        (error: HttpErrorResponse) =>
          this.handleAuthError(error))
    ) */
  }

/*   private handleAuthError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 401) {
      console.log('Ошибка Авторизации [401]');

      this.router.navigate([''], {
        queryParams: {
          sessionExpired: true
        }
      });
    }
    return throwError(error)
  } */
}
