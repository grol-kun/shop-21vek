import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { baseUrl, TokenName } from '../url';
import { User } from '../interfaces/user';
import { UserInfoService } from './user-info.service';
interface loginInfo { login: string; password: string }
interface Registerinfo extends loginInfo {
  firstName: string,
  lastName: string
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userInfo: Subject<User | null> = new Subject();
  //userInfo: BehaviorSubject<User | null> = new BehaviorSubject(null);
  constructor(
    private httpClient: HttpClient,
    private userInfoService: UserInfoService
    ) { }
  getuserInfo(): void {
    this.httpClient.get<User>(`${baseUrl}/users/userInfo`)
      .subscribe({
        next: (data) => {
          this.userInfo.next(data);
          console.log(data);
/*           UserInfoService.userInfo = data;
          console.log(UserInfoService.userInfo); */
          this.userInfoService.setInfo(data);
        },
        error: (err) => console.error(err),
        complete: () => console.info('getuserInfo complete')
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
      localStorage.setItem(TokenName, token);
    }
  }
  removeToken() {
    localStorage.removeItem(TokenName);
  }
  getToken() {
    return localStorage.getItem(TokenName);
  }
  hasToken() {
    const token = localStorage.getItem(TokenName);
    return !!token;
  }
}
