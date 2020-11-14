import { Component, OnInit } from '@angular/core';
import {DataStorageService} from '../../shared/data-storage.service';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {Observable} from 'rxjs';
import {WineryModel} from '../../wineries/winery.model';


@Component({
  selector: 'app-all-wines',
  templateUrl: './all-wines.component.html',
  styleUrls: ['./all-wines.component.css']
})
export class AllWinesComponent implements OnInit {

  // wines: { name: string, imageUrl: string }[];
  winery: Observable<{ winery: WineryModel }>;
  // constructor(private dataStorageService: DataStorageService) { }
  constructor(private store: Store<fromApp.AppState>) {}
  ngOnInit(): void {
    // this.wines = this.dataStorageService.getWines();
    this.winery = this.store.select('winery');
  }

}
