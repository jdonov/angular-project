import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {MyWineriesComponent} from './my-wineries/my-wineries.component';
import {MyOrdersComponent} from './my-orders/my-orders.component';
import {AllWinesComponent} from './all-wines/all-wines.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: AllWinesComponent},
  { path: 'auth', component: AuthComponent },
  { path: 'my-wineries', component: MyWineriesComponent},
  { path: 'my-orders', component: MyOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
