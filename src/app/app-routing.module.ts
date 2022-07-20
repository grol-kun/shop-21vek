import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { MainPageComponent } from './main/main-page.component';
import { OrderComponent } from './order/order/order.component';
import { ProfileInfoComponent } from './profile/profile-info/profile-info.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'order', component: OrderComponent },
  { path: 'profile/info', canActivate: [AuthGuard], component: ProfileInfoComponent },
  /*   { path: '404', component: MainPageComponent }, //сделать компонент для 404 или не сделать... )0
    { path: '**', redirectTo: '' }, */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
