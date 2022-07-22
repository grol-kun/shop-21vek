import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs'




@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],

})
export class NavigationComponent implements OnInit, OnDestroy {
  private subs!: Subscription;
  cartCount = 0;
  hidden = true;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.subs = this.authService.userInfo
      .subscribe({
        next: (data) => {
          if (data?.cart.length) {
            this.cartCount = data?.cart.length;
            this.hidden = false;
          }else{
            this.hidden = true;
          }
        },
        error: (err) => console.error(err)
      })
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }


}
