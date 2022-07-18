import { AppComponent } from './app.component';
import { MainPageComponent } from './main/main-page.component';
import { HomeblockComponent } from './main/homeblock/homeblock.component';
import { PopularComponent } from './main/popular/popular.component';
import { SignupComponent } from './signup/signup.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { InfoBlockComponent } from './header/info-block/info-block.component';
import { NavigationComponent } from './header/navigation/navigation.component';
import { NavBarComponent } from './header/nav-bar/nav-bar.component';
import { SearchComponent } from './header/navigation/search/search.component';
import { AccountMenuComponent } from './header/navigation/account-menu/account-menu.component';


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpService } from './services/http.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    HomeblockComponent,
    PopularComponent,
    SignupComponent,
    FooterComponent,
    HeaderComponent,
    InfoBlockComponent,
    NavigationComponent,
    NavBarComponent,
    SearchComponent,
    AccountMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [HttpService, {
    provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue:
      { hasBackdrop: true, panelClass: "my-dialog-class" }
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
