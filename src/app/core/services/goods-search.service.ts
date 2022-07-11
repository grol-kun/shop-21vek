import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, debounceTime, distinctUntilChanged, filter, of, switchMap, catchError } from 'rxjs';
import { PlainGetService } from './plain-get.service';

@Injectable()

export class GoodsSearchService {

  constructor(private httpClient: HttpClient, private plainGetService: PlainGetService) { }

  public getGoodsByNames(key: string) {
    of(key).pipe(
      debounceTime(700),
      distinctUntilChanged(),
      filter((key) => key.length >= 1),
      switchMap(key => {
        return (this.plainGetService.get(`goods/search?text=${key}`)).pipe(
          catchError(err => of([]))
        )
      })
    )
      .subscribe({
        next: res => {
          console.log(res);
        },
        error: console.log
      });

  }
}
