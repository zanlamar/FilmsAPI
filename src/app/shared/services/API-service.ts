import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams  } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Film, APIResponse } from '../models/film-basic';
import { firstValueFrom } from 'rxjs';
import { signal } from '@angular/core';


@Injectable({
    providedIn: 'root'
})

export class APIservice {
    // signals para cada componente
    films = signal<Film[]>([]);
    loading = signal<boolean>(false);

    // config de la API
    private hasInitializedOnce = false;
    private http = inject(HttpClient);
    private apiKey: string = environment.API_KEY;
    private apiUrl: string = 'https://api.themoviedb.org/3/movie/now_playing';
    private headers = new HttpHeaders({
        'Authorization': `Bearer ${this.apiKey}`
    });
    private params = new HttpParams().set('language', 'en');

    // para las páginas
    private page = 1;
    private totalPages: number | null = null;
    readonly pageSize = 20;


    async loadFilms() {

        if (this.hasInitializedOnce && this.films().length > 0) return;
        
        if (this.loading()) return;  // evita llamadas simultáneas
        if (this.totalPages !== null && this.page > this.totalPages) return;  // Si ya llegamos al final, no pedir más
        
        this.loading.set(true);
        
        try {
            // añadimos el número de página a los parámetros
            const paramsWithPage = this.params.set('page', this.page.toString());

            const response = await firstValueFrom(
                this.http.get<APIResponse>(
                    this.apiUrl, 
                    { 
                        headers: this.headers, 
                        params: paramsWithPage,
                    })
            );

            // si ya hay films, agregamos los nuevos
            const currentFilms = this.films();
            const newFilms = response.results || [];
            this.films.set([...currentFilms, ...newFilms]);

            // ojo las paginasss: se actualiza el total de páginas y página actual
            this.totalPages = response.total_pages;
            this.page++;

        } catch (error) {
            console.error('Error loading films:', error);
        } finally {
            this.loading.set(false);
        }
    }
}