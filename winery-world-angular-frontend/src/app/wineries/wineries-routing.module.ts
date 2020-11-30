import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyWineriesComponent} from './my-wineries/my-wineries.component';
import {AllWineriesResolverService} from './all-wineries/all-wineries-resolver.service';
import {RegisterEditWineryComponent} from './register-edit-winery/register-edit-winery.component';
import {WineryComponent} from './winery/winery.component';
import {WineryResolverService} from './winery/winery-resolver.service';
import {RegisterEditWineComponent} from '../wines/register-edit-wine/register-edit-wine.component';
import {CommentsComponent} from '../comments/comments.component';
import {CommentsResolverService} from '../comments/comments-resolver.service';
import {AllWinesComponent} from '../wines/all-wines/all-wines.component';
import {AllWineriesComponent} from './all-wineries/all-wineries.component';
import {AuthGuard} from '../auth/auth.guard';


const routes: Routes = [
  { path: 'home', component: AllWineriesComponent, resolve: [AllWineriesResolverService]},
  { path: 'my-wineries', canActivate: [AuthGuard], component: MyWineriesComponent, resolve: [AllWineriesResolverService], children: [
      {path: 'register', component: RegisterEditWineryComponent}
    ]
  },
  { path: 'wineries/:wineryId', canActivate: [AuthGuard] , component: WineryComponent, resolve: [WineryResolverService], children: [
      {path: 'edit', component: RegisterEditWineryComponent},
      {path: 'register-wine', component: RegisterEditWineComponent},
      {path: 'comments', component: CommentsComponent, resolve: [CommentsResolverService]},
      {path: 'wines', component: AllWinesComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WineriesRoutingModule {}
