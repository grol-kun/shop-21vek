import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Observable, map, debounceTime, distinctUntilChanged, filter, of, switchMap, catchError } from 'rxjs';
import { Good } from '../interfaces/good';
import { baseUrl } from '../url';
//import { HttpService } from './http.service';

@Injectable()

export class GoodsSearchService {

  constructor(
    //private httpService: HttpService,
    private httpClient: HttpClient
  ) { }

  public getGoodsByNames(key: string): Observable<any> {
    //  return of(key).pipe(
    //     debounceTime(700),
    //     distinctUntilChanged(),
    //     //filter((key) => key.length > 1),
    //     switchMap(key => {
    //       return (this.plainGetService.get(`goods/search?text=${key}`)).pipe(
    //         catchError(err => of([]))
    //       )
    //     })
    //   )

    /* return (this.httpService.get(`goods/search?text=${key}`)).pipe(
      catchError(err => of([]))
    ) */
    return (this.httpClient.get(`${baseUrl}/goods/search?text=${key}`)).pipe(
      catchError(err => of([]))
    )
  }

}
