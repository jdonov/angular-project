import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as AllAuthActions from './auth/store/auth.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isLoading: boolean;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(new AllAuthActions.AutoLogin());
    this.store.select(state => state.shared.loading).subscribe(loading => this.isLoading = loading);
  }
}
