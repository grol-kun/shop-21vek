import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { GoodsSearchService } from 'src/app/core/services/goods-search.service';

export interface IGood {
  id: string,
  name: string,
  imageUrls: [],
  availableAmount: number,
  price: number,
  rating: number,
  description: string
}
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [GoodsSearchService],
  changeDetection: ChangeDetectionStrategy.OnPush
  //encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {
  //public value!: IGood;
  private destroy$ = new Subject<void>();
  public results: IGood[] = [];
  public searchControl = new FormControl('');

  constructor(private goodsSearchService: GoodsSearchService, private cdr: ChangeDetectorRef) { }

  public ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        switchMap((value) => this.goodsSearchService.getGoodsByNames(value ?? '')),
        takeUntil(this.destroy$)
      )
      .subscribe((res) => {
        this.results = res;
        console.log(this.results);

        this.cdr.detectChanges();
        //this.cdr.markForCheck();
      });
  }

  // public doSearch(value: string) {

  //   this.goodsSearchService.getGoodsByNames(value)
  //     .subscribe({
  //       next: res => this.results = res,
  //       error: console.log
  //     });

  //   //console.log(this.results);

  // }

  public onDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
