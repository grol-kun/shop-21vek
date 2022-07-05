import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { CoreComponent } from './core.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { InfoBlockComponent } from './header/info-block/info-block.component';

@NgModule({
  declarations: [
    CoreComponent,
    HeaderComponent,
    FooterComponent,
    InfoBlockComponent
  ],
  imports: [
    CommonModule,
    BrowserModule
  ],
  exports:[
    CoreComponent,
    HeaderComponent
  ]
})
export class CoreModule { }
