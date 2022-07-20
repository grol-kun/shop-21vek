import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from '../url';

@Injectable()
export class HttpService {

  //private serverUrl = 'http://localhost:3004/';
  private serverUrl = baseUrl;

  constructor(private httpClient: HttpClient) { }

  public get(param: string): Observable<any> {
    return this.httpClient.get(`${this.serverUrl}${param}`)
  }

  public post(param: string, body?: any): Observable<any> {
    return this.httpClient.post(`${this.serverUrl}${param}`, body)
  }
}
