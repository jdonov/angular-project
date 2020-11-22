import {NgModule} from '@angular/core';
import {AllWinesComponent} from './all-wines/all-wines.component';
import {WineComponent} from './wine/wine.component';
import {RegisterEditWineComponent} from './register-edit-wine/register-edit-wine.component';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AllWinesComponent, WineComponent, RegisterEditWineComponent
  ],
  imports: [
    SharedModule, ReactiveFormsModule
  ],
  exports: [
    AllWinesComponent, WineComponent, RegisterEditWineComponent
  ]
})
export class WinesModule{}
