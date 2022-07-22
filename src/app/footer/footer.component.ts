import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  subscribed = false;

  constructor() { }

  ngOnInit(): void {
  }

  subscribe() {
    this.subscribed = true;
  }
}
