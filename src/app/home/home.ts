import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Film } from '../shared/models/film-basic';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  films: Film[] = [];
  loading = false;
  currentPage = 1;
  hasMoreFilms = true;

  ngOnInit() {
    this.loadFilms();
  }

  loadFilms() {
    if (this.loading || !this.hasMoreFilms) return;
    
    this.loading = true;
    
    // Simulate API call with mock data
    setTimeout(() => {
      const newFilms = this.generateMockFilms(this.currentPage);
      this.films = [...this.films, ...newFilms];
      this.currentPage++;
      this.loading = false;
      
      // Simulate end of data after 5 pages (50 films)
      if (this.currentPage > 5) {
        this.hasMoreFilms = false;
      }
    }, 1000);
  }

  private generateMockFilms(page: number): Film[] {
    const films: Film[] = [];
    const startId = (page - 1) * 10 + 1;
    
    for (let i = 0; i < 10; i++) {
      films.push({
        id: startId + i,
        title: `Film Title ${startId + i}`,
        poster_path: `https://picsum.photos/300/450?random=${startId + i}`,
        overview: `This is the overview for film ${startId + i}. A compelling story that captivates audiences.`,
        release_date: `202${Math.floor(Math.random() * 4)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
      });
    }
    
    return films;
  }

  onLoadMore() {
    this.loadFilms();
  }
}
