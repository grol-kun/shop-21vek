import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class GoodsSearchService {

  constructor(private httpClient: HttpClient) { }

  public getGoodsByNames(url: string): Observable<any> {
    console.log(this.httpClient.get(url));
    return this.httpClient.get(url);
  }

}
