import { Component, OnInit } from '@angular/core';
import { CategoryServise } from 'src/app/services/category.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private categoryService: CategoryServise) { }

  ngOnInit(): void {
    this.categoryService.fetchCategories();
  }

  get categories() {
    return this.categoryService.categories;
  }
}
