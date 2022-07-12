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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './header/navigation/search/search.component';
import { PlainGetService } from './services/plain-get.service';
import {MatCardModule} from '@angular/material/card';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { AccountMenuComponent } from './header/navigation/account-menu/account-menu.component';


@NgModule({
  declarations: [
    CoreComponent,
    HeaderComponent,
    FooterComponent,
    InfoBlockComponent,
    NavigationComponent,
    NavBarComponent,
    SearchComponent,
    AccountMenuComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    CoreComponent,
    HeaderComponent
  ],
  providers: [PlainGetService]
})
export class CoreModule { }
