import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams  } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FilmDetail, APIresponseRecommended, APIResponseCast, FilmCredits } from '../models/film-details';
import { firstValueFrom } from 'rxjs';
import { signal } from '@angular/core';
import { Film } from '../models/film-basic';


@Injectable({
    providedIn: 'root'
})

export class APIfilmService {
    // signals
    film = signal<FilmDetail | null>(null);
    loading = signal<boolean>(false);
    error = signal<boolean>(false);

    //config de la API
    private http = inject(HttpClient);
    private apiKey: string = environment.API_KEY;
    private apiUrl: string = 'https://api.themoviedb.org/3/movie/';
    private headers = new HttpHeaders({
        'Authorization': `Bearer ${environment.API_READ_TOKEN}`
    });

    private params = new HttpParams().set('language', 'en');

    // recibe el ID
    async showFilm(filmID:number) {
        if (this.loading()) return;

        this.loading.set(true);
        this.error.set(false);

        try {
            const url = `${this.apiUrl}/${filmID}`;

            const response = await firstValueFrom(
                this.http.get<FilmDetail>(
                    url, 
                    { 
                        headers: this.headers, // TO BE DEFINED
                        params: this.params
                    })
            );
            this.film.set(response);
        } catch (error) {
            console.error('Error loading film details:', error);
            this.error.set(true);  // Marca que hubo error
            this.film.set(null);
        } finally {
            this.loading.set(false);
        }
    }
    
    // para el cast y las recomendadas
    cast = signal<APIResponseCast[]>([]);
    recommended = signal<Film[]>([]);

    async showCast(filmID:number) {
        this.loading.set(true);
        this.error.set(false);

        try {
            const url = `${this.apiUrl}/${filmID}/credits`;

            const response = await firstValueFrom(
                this.http.get<FilmCredits>(
                    url, 
                    { 
                        headers: this.headers, // TO BE DEFINED
                        params: this.params
                    })
            );
            this.cast.set(response.cast);

        } catch (error) {
            console.error('Error loading film details:', error);
            this.error.set(true);  // Marca que hubo error
            this.film.set(null);
        } finally {
            this.loading.set(false);
        }
    }

    async showRecommended(filmID:number) {
        this.loading.set(true);
        this.error.set(false);

        try {
            const url = `${this.apiUrl}/${filmID}/recommendations`;

            const response = await firstValueFrom(
                this.http.get<APIresponseRecommended>(
                    url, 
                    { 
                        headers: this.headers, // TO BE DEFINED
                        params: this.params
                    })
            );
            this.recommended.set(response.results);

        } catch (error) {
            console.error('Error loading film details:', error);
            this.error.set(true);  // Marca que hubo error
            this.film.set(null);
        } finally {
            this.loading.set(false);
        }
    }


}