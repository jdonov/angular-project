import {Injectable} from '@angular/core';
import {WineryEditBindingDTO, WineryRegisterBindingDTO} from '../winery.model';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {AddWineryStart, EditWineryStart} from '../store/wineries.actions';
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
    this.store.dispatch(new EditWineryStart(wineryToEdit));
    this.isSent.next(true);
  }
}
