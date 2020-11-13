import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {MyWineriesComponent} from './wineries/my-wineries/my-wineries.component';
import {MyOrdersComponent} from './my-orders/my-orders.component';
import {AllWineriesComponent} from './wineries/all-wineries/all-wineries.component';
import {WineryComponent} from './wineries/winery/winery.component';
import {RegisterEditWineryComponent} from './wineries/register-edit-winery/register-edit-winery.component';
import {RegisterEditWineComponent} from './wines/register-edit-wine/register-edit-wine.component';
import {CommentsComponent} from './comments/comments.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: AllWineriesComponent},
  { path: 'auth', component: AuthComponent },
  { path: 'my-wineries', component: MyWineriesComponent},
  { path: 'my-orders', component: MyOrdersComponent},
  { path: 'winery', component: WineryComponent, children: [
      { path: 'edit', component: RegisterEditWineryComponent},
      { path: 'register-wine', component: RegisterEditWineComponent},
      { path: 'comment', component: CommentsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
