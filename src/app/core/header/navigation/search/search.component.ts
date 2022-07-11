import { Component, OnInit } from '@angular/core';
import { GoodsSearchService } from 'src/app/core/services/goods-search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [GoodsSearchService]
})
export class SearchComponent implements OnInit {
  searchParam: string = '';

  constructor(private goodsSearchService: GoodsSearchService) { }

  ngOnInit(): void {
  }

  public doSearch(value:string) {
    this.searchParam = value;
    let result = this.goodsSearchService.getGoodsByNames(this.searchParam);
    console.log(result);
  }
}
