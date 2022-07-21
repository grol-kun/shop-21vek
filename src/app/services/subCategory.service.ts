import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, from, Observable, map, merge, of, switchMap } from "rxjs";
import { baseUrl } from '../url';
import { Category } from "../interfaces/category";
import { SubCategory } from "../interfaces/subCategory";
import { CleverGood } from "../interfaces/good";

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  cashParentId = new Map;
  subData: SubCategory[] = [];
  parentId = '';

  constructor(private httpClient: HttpClient) { }

  fetchSubCategories(): Observable<SubCategory[]> {
    return this.httpClient.get<Category[]>(baseUrl + '/categories')
      .pipe(
        map((categoryElements) => {
          categoryElements.forEach((el) => {
            this.subData.push(el.subCategories[0]);
            this.subData.push(el.subCategories[1]);
            this.cashParentId.set(el.subCategories[0].id, el.id);
            this.cashParentId.set(el.subCategories[1].id, el.id);
          })
        }),
        switchMap(x => of(this.subData))
      )
  }

  whoIsDaddy(idOfSubCategory: string): Observable<string> {
    if (this.cashParentId.has(idOfSubCategory)) {
      return of(this.cashParentId.get(idOfSubCategory))
    } else {
      return this.httpClient.get<Category[]>(baseUrl + '/categories')
        .pipe(
          map((categoryElements) => {
            categoryElements.forEach((catElem) => {
              catElem.subCategories.forEach((subCatElem) => {
                if (subCatElem.id === idOfSubCategory) {
                  this.parentId = catElem.id;
                }
              })
            })
          }),
          switchMap(x => of(this.parentId))
        )
    }
  }

  getGoods(categoryId: string, subCategoryId: string, start?: number, count?: number, sortBy?: string, reverse?: boolean): Observable<CleverGood[]> {
    return this.httpClient.get(`${baseUrl}/goods/category/${categoryId}/${subCategoryId}?start=${start}&count=${count}&sortBy=${sortBy}&reverse=${reverse}`) as Observable<CleverGood[]>
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
