import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  static userInfo: User = {
    firstName: 'Пользователь',
    lastName: 'Незарегистрирован',
    cart: [],
    favorites: [],
  }

  constructor() { }

  public setInfo(data: User): void {
    UserInfoService.userInfo = data;
    localStorage.setItem('21vek:userInfo', JSON.stringify(data));
  }

  public getInfo() {
    let data = localStorage.getItem('21vek:userInfo');
    if (data) {
      return JSON.parse(data);
    }
  }

}
