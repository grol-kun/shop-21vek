import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
@Injectable()
export class MailValidatorService {
  private users!: any[];

  constructor(private http: HttpService) {
    /** Пользователи, зарегистрированные в системе */
    this.http.get('/users')
      .subscribe((res) => this.users = res)
  }

  /** Запрос валидации */
  validateMail(userMail: string): Observable<ValidationErrors> {
    console.log(this.users);
    /** Эмуляция запроса на сервер */
    return new Observable<ValidationErrors>(observer => {
      const user = this.users.find(user => user.login === userMail);
      /** если пользователь есть в массиве, то возвращаем ошибку */
      if (user) {
        observer.next({
          //nameError: 'Пользователь с таким именем уже существует'
          'nameError': true
        });
        observer.complete();
      }

      /** Если пользователя нет, то валидация успешна */
      observer.next(undefined);
      observer.complete();
    });
  }

  /** Запрос валидации */
  existValidate(userMail: string): Observable<ValidationErrors> {
    console.log(this.users);
    /** Эмуляция запроса на сервер */
    return new Observable<ValidationErrors>(observer => {
      const user = this.users.find(user => user.login === userMail);
      /** если пользователь есть в массиве, то возвращаем ошибку */
      if (!user) {
        observer.next({
          //nameError: 'Пользователь с таким именем уже существует'
          'existError': true
        });
        observer.complete();
      }

      /** Если пользователя нет, то валидация успешна */
      observer.next(undefined);
      observer.complete();
    });
  }
}
