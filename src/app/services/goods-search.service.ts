import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Observable, map, debounceTime, distinctUntilChanged, filter, of, switchMap, catchError } from 'rxjs';
import { Good } from '../good';
import { HttpService } from './http.service';

@Injectable()

export class GoodsSearchService {

  constructor(private httpService: HttpService) { }

  public getGoodsByNames(key: string): Observable<Good[]> {
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

    return (this.httpService.get(`goods/search?text=${key}`)).pipe(
      catchError(err => of([]))
    )
  }
}
