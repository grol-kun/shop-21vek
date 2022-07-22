import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { GoodsService } from 'src/app/services/goods.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  private subs!: Subscription;
  userInfo!: User;
  cartCount = 0;
  cartList: any;

  constructor(
    public authService: AuthService,
    public goodsService: GoodsService
  ) { }

  ngOnInit(): void {
    this.subs = this.authService.userInfo
      .subscribe({
        next: (data) => {
          if (data !== null) {
            this.userInfo = data;
            this.cartList = this.goodsService.getAddedToCartGoods(data.cart);
          }
          this.cartCount = data?.cart.length ? data?.cart.length : 0
        },
        error: (err) => console.error(err)
      })
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
