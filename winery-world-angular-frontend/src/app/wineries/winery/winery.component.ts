import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-winery',
  templateUrl: './winery.component.html',
  styleUrls: ['./winery.component.css']
})
export class WineryComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  editWinery(): void{
    this.router.navigate(['/winery/edit']);
  }

  registerWine(): void {
    this.router.navigate(['/winery/register-wine']);
  }

  leaveComment(): void {
    this.router.navigate(['/winery/comment']);
  }
}
