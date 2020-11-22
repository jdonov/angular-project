import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingCartComponent } from './header/shopping-cart/shopping-cart.component';
import {StoreModule} from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import {EffectsModule} from '@ngrx/effects';
import {WineriesEffects} from './wineries/store/wineries.effects';
import {CommentsEffects} from './comments/store/comments.effects';
import {WineriesModule} from './wineries/wineries.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    MyOrdersComponent, ShoppingCartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([WineriesEffects, CommentsEffects]),
    FontAwesomeModule,
    WineriesModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
