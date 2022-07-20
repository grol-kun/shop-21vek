import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['registered']) {
        //alert('Вы уже зарегистрированы');
      } else if (params['accessDenied']) {
        alert('Сначала зарегистрируйтесь');
      }
    })
  }

}
