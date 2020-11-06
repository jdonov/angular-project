import { Component } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  faStar = faStar;
  isActive: boolean;
  ratings = [0, 1, 2, 3, 4];

  changeColor(): void {
    this.isActive = !this.isActive;
  }


}
