import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { HttpService } from './http.service';

export interface registerForm {
  firstName: string,
  lastName: string,
  login: string,
  password: string
}

@Injectable(/* {
  providedIn: 'root'
} */)
export class RegisterService {

  constructor(private httpService: HttpService) { }

  public register(body: registerForm): Observable<{ token: string }> {
    return (this.httpService.post(`users/register`, body)).pipe(
      catchError(err => of(err))
    )
  }

}
