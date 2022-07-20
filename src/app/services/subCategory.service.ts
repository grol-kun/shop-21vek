import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from "rxjs";
import { baseUrl } from '../url';
import { Category } from "../interfaces/category";
import { SubCategory } from "../interfaces/subCategory";

@Injectable({ providedIn: 'root' })
export class SubCategoryService {
  categories: BehaviorSubject<SubCategory[]> = new BehaviorSubject([] as SubCategory[])
  constructor(private httpClient: HttpClient) { }
  fetchCategories() {
    this.httpClient.get<Category[]>(baseUrl + '/categories').subscribe(data => {
      let subData: SubCategory[] = [];
      data.forEach((el) => {
        subData.push(el.subCategories[0]);
        subData.push(el.subCategories[1]);
      })
      this.categories.next(subData)
    })
  }
}
