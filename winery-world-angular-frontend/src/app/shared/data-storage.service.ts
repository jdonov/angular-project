import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  wineries: string[];

  constructor(private http: HttpClient) {
    this.wineries = [];
    this.wineries.push('Winery 1');
    this.wineries.push('Winery 2');
    this.wineries.push('Winery 3');
  }

  getMyWineris(): string[] {
    return this.wineries;
  }
}
