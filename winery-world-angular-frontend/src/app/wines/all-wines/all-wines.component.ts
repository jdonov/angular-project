import { Component, OnInit } from '@angular/core';
import {DataStorageService} from '../../shared/data-storage.service';

@Component({
  selector: 'app-all-wines',
  templateUrl: './all-wines.component.html',
  styleUrls: ['./all-wines.component.css']
})
export class AllWinesComponent implements OnInit {

  wines: string[];
  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.wines = this.dataStorageService.getWines();
  }

}
