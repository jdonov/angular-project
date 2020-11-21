import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {WineDeleteStart} from '../../wineries/store/wineries.actions';
import {WineUpdateDTO} from '../wine.model';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class WineService {
  wineRate = new Subject<{ rating: string, wineId: string }>();

  constructor(private store: Store<fromApp.AppState>, private route: ActivatedRoute, private router: Router) {}

  deleteWine(id: string): void {
    this.store.dispatch(new WineDeleteStart({id}));
  }

  editWine(wine: WineUpdateDTO): void {
    this.router.navigate(['../', 'wines'], {relativeTo: this.route});
  }

}
