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
import {AllWinesComponent} from './wines/all-wines/all-wines.component';
import {WineComponent} from './wines/wine/wine.component';
import {AllWineriesResolverService} from './wineries/all-wineries/all-wineries-resolver.service';
import {WineryResolverService} from './wineries/winery/winery-resolver.service';
import {CommentsResolverService} from './comments/comments-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: AllWineriesComponent, resolve: [AllWineriesResolverService]},
  { path: 'my-orders', component: MyOrdersComponent}
  // { path: 'my-wineries', component: MyWineriesComponent, resolve: [AllWineriesResolverService], children: [
  //     { path: 'register', component: RegisterEditWineryComponent}
  //   ]},
  // { path: 'wineries/:wineryId', component: WineryComponent, resolve: [WineryResolverService], children: [
  //     { path: 'edit', component: RegisterEditWineryComponent},
  //     { path: 'register-wine', component: RegisterEditWineComponent},
  //     { path: 'comments', component: CommentsComponent, resolve: [CommentsResolverService]},
  //     { path: 'wines', component: AllWinesComponent, children: [
  //         { path: 'wine/:id', component: RegisterEditWineComponent}
  //       ]},
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
