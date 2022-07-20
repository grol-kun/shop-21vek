import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from "rxjs";
import { baseUrl } from '../url';
import { Category } from "../interfaces/category";

@Injectable(/* { providedIn: 'root' } */)
export class CategoryServise {
  categories: BehaviorSubject<Category[]> = new BehaviorSubject([] as Category[])
  constructor(private httpClient: HttpClient) { }
  fetchCategories() {
    this.httpClient.get<Category[]>(baseUrl + '/categories').subscribe(data => {
      this.categories.next(data)
    })
    console.log('Внутри fetchCategories');
  }

}
