import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, from, Observable, map, merge, of, switchMap } from "rxjs";
import { baseUrl } from '../url';
import { Category } from "../interfaces/category";
import { SubCategory } from "../interfaces/subCategory";

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  subData: SubCategory[] = []
  constructor(private httpClient: HttpClient) { }

  fetchCategories(): Observable<SubCategory[]> {
    return this.httpClient.get<Category[]>(baseUrl + '/categories')
      .pipe(
        map((categoryElement) => {
          categoryElement.forEach((el) => {
            this.subData.push(el.subCategories[0]);
            this.subData.push(el.subCategories[1]);
          })
        }),
        switchMap(x => of(this.subData))
      )


    /*       .subscribe(data => {
            let subData: SubCategory[] = [];
            data.forEach((el) => {
              subData.push(el.subCategories[0]);
              subData.push(el.subCategories[1]);
            })
            return from<SubCategory[]>(subData);
          }) */
  }
}

/* export class SubCategoryService {
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
} */
