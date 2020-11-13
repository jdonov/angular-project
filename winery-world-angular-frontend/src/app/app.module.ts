import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { RatingComponent } from './shared/rating/rating.component';
import { MyWineriesComponent } from './wineries/my-wineries/my-wineries.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AllWinesComponent } from './wines/all-wines/all-wines.component';
import { HttpClientModule } from '@angular/common/http';
import { AllWineriesComponent } from './wineries/all-wineries/all-wineries.component';
import {DropdownDirective} from './shared/dropdown.directive';
import { WineryComponent } from './wineries/winery/winery.component';
import { RegisterEditWineryComponent } from './wineries/register-edit-winery/register-edit-winery.component';
import { RegisterEditWineComponent } from './wines/register-edit-wine/register-edit-wine.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    RatingComponent,
    MyWineriesComponent,
    MyOrdersComponent,
    AllWinesComponent, AllWineriesComponent, DropdownDirective, WineryComponent, RegisterEditWineryComponent, RegisterEditWineComponent
  ],
  imports: [BrowserModule, HttpClientModule, FontAwesomeModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
