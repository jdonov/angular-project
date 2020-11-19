import {Injectable} from '@angular/core';
import {WineryEditBindingDTO, WineryRegisterBindingDTO} from '../winery.model';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {AddWineryStart} from '../store/wineries.actions';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';


@Injectable({providedIn: 'root'})
export class RegisterEditWineryService {
  isSent = new Subject<boolean>();
  constructor(private store: Store<fromApp.AppState>) {}

  registerWinery(winery: WineryRegisterBindingDTO): void {
    this.store.dispatch(new AddWineryStart(winery));
    this.isSent.next(true);
  }

  editWinery(id: string, winery: WineryRegisterBindingDTO): void {
    const wineryToEdit: WineryEditBindingDTO = {
      id,
      ...winery
    };
    this.isSent.next(true);
    console.log(wineryToEdit);
  }
}
