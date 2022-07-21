import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SubCategory } from 'src/app/interfaces/subCategory';
import { CategoryServise } from 'src/app/services/category.service';
import { SubCategoryService } from 'src/app/services/subCategory.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  categories!: Observable<SubCategory[]>

  constructor(
    //private categoryService: CategoryServise,
    private subCategoryService: SubCategoryService
  ) { }

  ngOnInit(): void {
    //this.categoryService.fetchCategories();
    this.categories = this.subCategoryService.fetchSubCategories();
  }


  /* get categories() {
    return this.categoryService.categories;
  } */

}
