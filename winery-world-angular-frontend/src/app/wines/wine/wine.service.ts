import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class WineService {
  wineRate = new Subject<{ rating: string, wineId: string }>();

  constructor() {}

}
