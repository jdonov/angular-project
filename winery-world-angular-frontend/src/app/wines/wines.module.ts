import {NgModule} from '@angular/core';
import {AllWinesComponent} from './all-wines/all-wines.component';
import {WineComponent} from './wine/wine.component';
import {RegisterEditWineComponent} from './register-edit-wine/register-edit-wine.component';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import { WineAddedAlertComponent } from './wine-added-alert/wine-added-alert.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AllWinesComponent, WineComponent, RegisterEditWineComponent, WineAddedAlertComponent
  ],
  imports: [
    SharedModule, ReactiveFormsModule, RouterModule
  ],
  exports: [
    AllWinesComponent, WineComponent, RegisterEditWineComponent
  ]
})
export class WinesModule{}
