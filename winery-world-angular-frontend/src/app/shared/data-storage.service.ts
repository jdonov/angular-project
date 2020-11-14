import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WineInterface} from '../wines/wine-interface';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  wineries: string[];
  wines: WineInterface[];

  constructor(private http: HttpClient) {
    this.wineries = [];
    this.wineries.push('Winery 1');
    this.wineries.push('Winery 2');
    this.wineries.push('Winery 3');
    this.wines = [];
    this.wines.push(
      {
        name: 'Wine 1',
        imageUrl: 'https://images.unsplash.com/photo-1546944517-4f38480ff03c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        price: 60.00,
        description: 'Very good wine',
        rating: 3
      });
    this.wines.push(
      {
        name: 'Wine 2',
        imageUrl: 'https://images.unsplash.com/photo-1588406590000-6e285b62c833?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        price: 74.99,
        description: 'Wonderful wine',
        rating: 2
      }
    );
    this.wines.push(
      {
        name: 'Wine 3',
        imageUrl: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        price: 150.00,
        description: 'The best one',
        rating: 4
      }
    );
  }

  getMyWineris(): string[] {
    return this.wineries.slice();
  }

  getWines(): { name: string, imageUrl: string }[] {
    return this.wines.slice();
  }
}
