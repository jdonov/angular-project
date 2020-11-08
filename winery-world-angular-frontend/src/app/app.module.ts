import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { RatingComponent } from './rating/rating.component';
import { MyWineriesComponent } from './my-wineries/my-wineries.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AllWinesComponent } from './all-wines/all-wines.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    RatingComponent,
    MyWineriesComponent,
    MyOrdersComponent,
    AllWinesComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
