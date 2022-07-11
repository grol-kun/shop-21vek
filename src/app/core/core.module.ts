import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

import { CoreComponent } from './core.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { InfoBlockComponent } from './header/info-block/info-block.component';
import { NavigationComponent } from './header/navigation/navigation.component';
import { NavBarComponent } from './header/nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './header/navigation/search/search.component';

@NgModule({
  declarations: [
    CoreComponent,
    HeaderComponent,
    FooterComponent,
    InfoBlockComponent,
    NavigationComponent,
    NavBarComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MatMenuModule,
    MatIconModule,
    FormsModule
  ],
  exports: [
    CoreComponent,
    HeaderComponent
  ]
})
export class CoreModule { }
