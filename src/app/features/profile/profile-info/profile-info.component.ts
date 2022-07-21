import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {

  user!: User | null;

  constructor(
    private auth: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    this.auth.userInfo.subscribe((val) => this.user = val);
  }

  logout(){
    this.auth.removeToken();
    this.router.navigate(['']);
  }
}
