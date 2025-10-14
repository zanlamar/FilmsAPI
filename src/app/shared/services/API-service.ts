import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams  } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Film, APIResponse } from '../models/film-basic';
import { Observable, firstValueFrom } from 'rxjs';
import { signal } from '@angular/core';


@Injectable({
    providedIn: 'root'
})

export class APIservice {
    private http = inject(HttpClient);
    private apiKey: string = environment.API_KEY;
    private apiUrl: string = 'https://api.themoviedb.org/3/movie/now_playing';

    private headers = new HttpHeaders({
        'Authorization': `Bearer ${this.apiKey}`
    });

    private params = new HttpParams().set('language', 'en');

    films = signal<Film[]>([]);
    loading = signal<boolean>(false);

    async loadFilms() {
        this.loading.set(true);
        try {
            const response = await firstValueFrom(
                this.http.get<any>(this.apiUrl, { headers: this.headers })
            );
            this.films.set(response.results || []);
    } catch (error) {
        console.error('Error:', error);
        this.films.set([]);
    } finally {
        this.loading.set(false);
    }
}


    getFilms(): Observable<Film[]> {
        return this.http.get<Film[]>(this.apiUrl, { headers: this.headers });
    }
}