import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Good } from '../good';
import { HttpService } from './http.service';

@Injectable(/* {
  providedIn: 'root'
} */)
export class LoginService {

  constructor(private httpService: HttpService) { }

  public login(body: { login: string, password: string }): Observable<{ token: string }> {
    return (this.httpService.post(`users/login`, body)).pipe(
      catchError(err => of(err))
    )
  }

}
