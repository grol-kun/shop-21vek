import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { CleverGood } from 'src/app/interfaces/good';
import { SubCategoryService } from 'src/app/services/subCategory.service';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss']
})
export class SubcategoryComponent implements OnInit {
  categotyId!: Observable<string>;
  subCategoryId = '';
  categotyStringId = '';
  goods!: Observable<CleverGood[]>

  constructor(
    private route: ActivatedRoute,
    private subCategoryService: SubCategoryService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.subCategoryId = params['id'];
      this.categotyId = this.subCategoryService.whoIsDaddy(params['id'])

      this.categotyId.subscribe((id) => {
        this.categotyStringId = id;
        this.goods = this.subCategoryService.getGoods(this.categotyStringId, this.subCategoryId, 0, 10);
      });
    })
  }

}
