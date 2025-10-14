import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Film } from '../shared/models/film-basic';
import { APIservice } from '../shared/services/API-service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  constructor(private APIservice: APIservice) {}
    
    ngOnInit() {
      this.APIservice.loadFilms();
    }
    
    // Direct access to signals
    get films() { return this.APIservice.films(); }
    get loading() { return this.APIservice.loading(); }

  onLoadMore() {
    this.APIservice.loadFilms();
  };
};
