import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SignupComponent } from 'src/app/signup/signup.component';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss'],
})
export class AccountMenuComponent implements OnInit {
  public authStatus: boolean = false;
  private subs!: Subscription;

  constructor(
    public dialog: MatDialog,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.subs = this.authService.userInfo
      .subscribe({
        next: (data) => {
          if (data?.firstName)
            this.authStatus = true;
        },
        error: (err) => console.error(err)
      })
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  openDialog() {
    this.dialog.open(SignupComponent, {
      // height: '480px',
      // width: '480px',
    });
  }
}


