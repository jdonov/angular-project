import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RatingComponent} from './rating/rating.component';
import {DropdownDirective} from './dropdown.directive';

@NgModule({
  declarations: [
    RatingComponent, DropdownDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RatingComponent,
    CommonModule
  ]
})
export class SharedModule{}
