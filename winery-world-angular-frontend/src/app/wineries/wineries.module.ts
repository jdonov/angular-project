import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {WineriesRoutingModule} from './wineries-routing.module';
import {MyWineriesComponent} from './my-wineries/my-wineries.component';
import {AllWineriesComponent} from './all-wineries/all-wineries.component';
import {WineryComponent} from './winery/winery.component';
import {RegisterEditWineryComponent} from './register-edit-winery/register-edit-winery.component';
import {SharedModule} from '../shared/shared.module';
import {WinesModule} from '../wines/wines.module';
import {CommentsModule} from '../comments/comments.module';
import { WineryCardComponent } from './all-wineries/winery-card/winery-card.component';

@NgModule({
  declarations: [
    AllWineriesComponent, MyWineriesComponent, WineryComponent, RegisterEditWineryComponent, WineryCardComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    WineriesRoutingModule,
    WinesModule,
    CommentsModule,
    SharedModule
  ]
})
export class WineriesModule {}

