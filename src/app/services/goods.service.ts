import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../url';
import { UserInfoService } from './user-info.service';
import { CleverGood } from '../interfaces/good'
import { forkJoin, merge, mergeAll, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoodsService {

  constructor(
    private httpClient: HttpClient,
    private userInfo: UserInfoService
  ) { }

  addToCart(goodId: string) {
    console.log('addToCart', goodId);
    return this.httpClient.post(`${baseUrl}/users/cart`, { id: goodId })
  }

  /*   getAddedToCartGoods(cartList: string[]) {
      let arrOfGoods;
      return cartList.forEach((itemId) => {
        this.httpClient.get<CleverGood>(`${baseUrl}/goods/item/${itemId}`)
        .pipe(
          tap(item=>console.log(item),
          mergeAll()
          )
        )
      })

    } */

  getAddedToCartGoods(cartList: string[]): Observable<CleverGood[]> {
    return forkJoin(cartList => cartList.map(this.httpClient.get<CleverGood>(`${baseUrl}/goods/item/${itemId}`)))
  }

  deleteFromCart() { }

}
