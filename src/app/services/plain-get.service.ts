import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PlainGetService {

  private serverUrl = 'http://localhost:3004/';

  constructor(private httpClient: HttpClient) { }

  public get(param: string): Observable<any> {
    return this.httpClient.get(`${this.serverUrl}${param}`)
  }
}
