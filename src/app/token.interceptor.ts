import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenName } from "./url";


@Injectable()
export class HttpIntercept implements HttpInterceptor{

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token=localStorage.getItem(TokenName)
    return next.handle(req.clone({setHeaders:{Authorization:`Bearer ${token}`}}))
  }

}
