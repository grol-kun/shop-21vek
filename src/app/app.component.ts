import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = '21 vek...'
  constructor(
    public router: Router,
    private authService: AuthService
  ) {
  }
  ngOnInit(): void {
    this.router.events.subscribe(data => {
      if ((data as any).routerEvent && this.authService.hasToken()) {
        this.authService.getuserInfo()
      }
    })
  }

}
