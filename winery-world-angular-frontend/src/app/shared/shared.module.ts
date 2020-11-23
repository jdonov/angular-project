import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RatingComponent} from './rating/rating.component';
import {DropdownDirective} from './dropdown.directive';
import { RemoveUnderscorePipe } from './remove-underscore.pipe';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    RatingComponent, DropdownDirective, RemoveUnderscorePipe
  ],
  imports: [
    CommonModule, FontAwesomeModule, ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    FontAwesomeModule,
    RatingComponent,
    DropdownDirective,
    RemoveUnderscorePipe,
    ReactiveFormsModule
  ]
})
export class SharedModule{}
