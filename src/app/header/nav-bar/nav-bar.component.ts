import { Component, OnInit } from '@angular/core';
import { CategoryServise } from 'src/app/services/category.service';
import { SubCategoryService } from 'src/app/services/subCategory.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(
    //private categoryService: CategoryServise,
    private subCategoryService: SubCategoryService
  ) { }

  ngOnInit(): void {
    //this.categoryService.fetchCategories();
    this.subCategoryService.fetchCategories();
  }


  get categories() {
    return this.subCategoryService.categories;
  }

  /*     get categories() {
        return this.categoryService.categories;
      } */

}
