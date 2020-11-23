import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RatingComponent} from './rating/rating.component';
import {DropdownDirective} from './dropdown.directive';
import { RemoveUnderscorePipe } from './remove-underscore.pipe';

@NgModule({
  declarations: [
    RatingComponent, DropdownDirective, RemoveUnderscorePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    RatingComponent,
    DropdownDirective,
    RemoveUnderscorePipe
  ]
})
export class SharedModule{}
