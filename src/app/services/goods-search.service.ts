import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Observable, map, debounceTime, distinctUntilChanged, filter, of, switchMap, catchError } from 'rxjs';
import { IGood } from '../header/navigation/search/search.component';
import { PlainGetService } from './plain-get.service';

@Injectable()

export class GoodsSearchService {

  constructor(private plainGetService: PlainGetService) { }

  public getGoodsByNames(key: string): Observable<IGood[]> {
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

    return (this.plainGetService.get(`goods/search?text=${key}`)).pipe(
      catchError(err => of([]))
    )
  }
}
