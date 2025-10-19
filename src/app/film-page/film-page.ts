import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { APIfilmService } from '../shared/services/API-film-details.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-film-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './film-page.html',
  styleUrl: './film-page.css'
})
export class FilmPage implements OnInit {

  private route = inject(ActivatedRoute);
  private filmService = inject(APIfilmService);

  // parte de signals para el html
  film = this.filmService.film;
  loading = this.filmService.loading;
  error = this.filmService.error;

  ngOnInit(): void {
    const filmID = this.route.snapshot.params['id'];
    
    if (filmID) {
      // ID de la ruta importante
      this.filmService.showFilm(Number(filmID));
    }
  }

  getGenre(): string {
    const filmData = this.film();
      if (!filmData || !filmData.genres) return 'N/A';
      return filmData.genres.map( g => g.name).join(', ');
    }
}