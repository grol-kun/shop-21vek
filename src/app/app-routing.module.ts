import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { MainPageComponent } from './main/main-page.component';
import { OrderComponent } from './features/order/order.component';
import { ProfileInfoComponent } from './features/profile/profile-info/profile-info.component';
import { SubcategoryComponent } from './features/subcategory/subcategory.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'order', component: OrderComponent },
  { path: 'subcategories', component: SubcategoryComponent },
  { path: 'subcategories/:id', component: SubcategoryComponent },
  { path: 'profile/info', canActivate: [AuthGuard], component: ProfileInfoComponent },
  { path: '404', component: MainPageComponent }, //сделать компонент для 404 или не сделать... )0
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
