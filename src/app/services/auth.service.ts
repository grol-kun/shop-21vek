import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { baseUrl, TokenName } from '../url';
import { User } from '../user';
interface loginInfo { login: string; password: string }
interface Registerinfo extends loginInfo {
  firstName: string,
  lastName: string
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userInfo: Subject<User | null> = new Subject();
  //userInfo: BehaviorSubject<User | null> = new BehaviorSubject(null);
  constructor(private httpClient: HttpClient) { }
  getuserInfo(): void {
    this.httpClient.get<User>(`${baseUrl}/users/userInfo`).subscribe(data => {
      this.userInfo.next(data)
      console.log(data)
    })
  }
  login(userData: loginInfo): Observable<{ token: string }> {
    return this.httpClient.post<{ token: string }>(`${baseUrl}/users/login`, userData);
  }
  register(userData: Registerinfo): Observable<{ token: string }> {
    return this.httpClient.post<{ token: string }>(`${baseUrl}/users/register`, userData);
  }
  setToken(token: string) {
    if (token) {
      localStorage.setItem(TokenName, token)
    }
  }
  removeToken() {
    localStorage.removeItem(TokenName)
  }
  getToken() {
    return localStorage.getItem(TokenName)
  }
  hasToken() {
    const token = localStorage.getItem(TokenName)
    return !!token
  }
}
