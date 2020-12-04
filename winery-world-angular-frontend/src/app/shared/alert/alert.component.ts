import {Component, Input, OnInit, Output} from '@angular/core';
import {EventEmitter} from 'events';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {WineryClearError} from '../../wineries/store/wineries.actions';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() message: string;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
  }

  onClose(): void {
    this.store.dispatch(new WineryClearError());
  }

}
