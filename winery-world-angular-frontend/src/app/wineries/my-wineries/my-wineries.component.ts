import { Component, OnInit } from '@angular/core';
import {DataStorageService} from '../../shared/data-storage.service';

@Component({
  selector: 'app-my-wineries',
  templateUrl: './my-wineries.component.html',
  styleUrls: ['./my-wineries.component.css']
})
export class MyWineriesComponent implements OnInit {
  wyWineries: string[];
  constructor(private dataStore: DataStorageService) { }

  ngOnInit(): void {
    this.wyWineries = this.dataStore.getMyWineris();
  }

}
