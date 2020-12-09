import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import {EffectsModule} from '@ngrx/effects';
import {WineriesEffects} from './wineries/store/wineries.effects';
import {CommentsEffects} from './comments/store/comments.effects';
import {WineriesModule} from './wineries/wineries.module';
import {SharedModule} from './shared/shared.module';
import { NavDropdownComponent } from './header/nav-dropdown/nav-dropdown.component';
import {MyOrdersModule} from './my-orders/my-orders.module';
import {MyOrdersEffects} from './my-orders/store/my-orders.effects';
import {AuthEffects} from './auth/store/auth.effects';
import {CoreModule} from './core.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    NavDropdownComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([WineriesEffects, CommentsEffects, MyOrdersEffects, AuthEffects]),
    WineriesModule, MyOrdersModule, SharedModule, CoreModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
