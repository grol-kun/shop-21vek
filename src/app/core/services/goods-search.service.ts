import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class GoodsSearchService {

  constructor(private httpClient: HttpClient) { }

  public getGoodsByNames(key: string): Observable<any> {
    const url = `http://localhost:3004/goods/search?text=${key}`
    console.log(this.httpClient.get(url));
    return this.httpClient.get(url)
      .subscribe({
        next: console.log
      });

  }
