import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenName } from './url';
import { AuthService } from './services/auth.service';

@Injectable()
export class TokenInterseptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authServise = this.injector.get(AuthService);
    //const token = localStorage.getItem(TokenName);
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authServise.getToken()}`
      }
    });
    return next.handle(tokenizedReq);
  }
}
