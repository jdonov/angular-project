import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {ErrorPageComponent} from './shared/error-page-component/error-page.component';
import {AllWineriesComponent} from './wineries/all-wineries/all-wineries.component';
import {AllWineriesResolverService} from './wineries/all-wineries/all-wineries-resolver.service';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: AllWineriesComponent, resolve: [AllWineriesResolverService]},
  { path: 'auth', component: AuthComponent },
  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {anchorScrolling: 'enabled', enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
