import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { APIfilmService } from '../shared/services/API-film-details.service';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router'; 


@Component({
  selector: 'app-film-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './film-page.html',
  styleUrl: './film-page.css'
})
export class FilmPage implements OnInit {

  private route = inject(ActivatedRoute);
  private filmService = inject(APIfilmService);

  // parte de signals para el html
  film = this.filmService.film;
  cast = this.filmService.cast;
  recommended = this.filmService.recommended;
  loading = this.filmService.loading;
  error = this.filmService.error;

  ngOnInit(): void {
    const filmID = this.route.snapshot.params['id'];
    
    if (filmID) {
      // ID de la ruta importante
      this.filmService.showFilm(Number(filmID));
      this.filmService.showCast(Number(filmID));
      this.filmService.showRecommended(Number(filmID));

       // Añade estos logs temporales para debug:
    setTimeout(() => {
      console.log('Cast data:', this.cast());
      console.log('Recommended data:', this.recommended());
      console.log('Loading:', this.loading());
    }, 2000);
    }
  }

  getGenre(): string {
    const filmData = this.film();
      if (!filmData || !filmData.genres) return 'N/A';
      return filmData.genres.map( g => g.name).join(', ');
  }


}