import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { GoodsSearchService } from 'src/app/services/goods-search.service';
import { MatAutocompleteModule, MAT_AUTOCOMPLETE_DEFAULT_OPTIONS } from '@angular/material/autocomplete';
import { Good } from 'src/app/good';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [GoodsSearchService, {
    provide: MAT_AUTOCOMPLETE_DEFAULT_OPTIONS,
      useValue: { overlayPanelClass: 'my-search-class' }
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
  //encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {
  @Input('class')
  classList!: string | string[];

  //public value!: IGood;
  private destroy$ = new Subject<void>();
  public results: Good[] = [];
  public searchControl = new FormControl('');
  public myAutoComplitStyle = 'left:0';

  constructor(private goodsSearchService: GoodsSearchService, private cdr: ChangeDetectorRef) { }

  public ngOnInit(): void {
    this.classList = 'myAutoComplitStyle';
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


function panelWidthValue(panelWidthValue: any) {
  throw new Error('Function not implemented.');
}

