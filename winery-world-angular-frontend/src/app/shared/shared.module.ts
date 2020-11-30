import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RatingComponent} from './rating/rating.component';
import {DropdownDirective} from './dropdown.directive';
import { RemoveUnderscorePipe } from './remove-underscore.pipe';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ReactiveFormsModule} from '@angular/forms';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    RatingComponent, DropdownDirective, RemoveUnderscorePipe, LoadingSpinnerComponent
  ],
  imports: [
    CommonModule, FontAwesomeModule, ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
    exports: [
        CommonModule,
        FontAwesomeModule,
        RatingComponent,
        DropdownDirective,
        RemoveUnderscorePipe,
        ReactiveFormsModule,
        LoadingSpinnerComponent
    ]
})
export class SharedModule{}
