import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { APIservice } from './API-service';
import { APIResponse, Film } from '../models/film-basic';
import { environment } from '../../../environments/environment';

describe('APIservice', () => {
    let service: APIservice;
    let httpMock: HttpTestingController;

    const mockFilms: Film[] = [
        { id: 1, title: 'Film 1', poster_path: '/path1.jpg', vote_average: 8.5 },
        { id: 2, title: 'Film 2', poster_path: '/path2.jpg', vote_average: 7.8 }
    ];

    const mockAPIResponse: APIResponse = {
        results: mockFilms,
        page: 1,
        total_pages: 5,
        total_results: 100
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [APIservice]
        });

        service = TestBed.inject(APIservice);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should charge films and add them to the signal', async () => {
        const loadFilmsPromise = service.loadFilms();

        const req = httpMock.expectOne(req => 
        req.url.includes('now_playing') && 
        req.params.get('page') === '1'
        );

        expect(req.request.method).toBe('GET');
        req.flush(mockAPIResponse);

        await loadFilmsPromise;

        expect(service.films().length).toBe(2);
        expect(service.films()[0].title).toBe('Film 1');
        expect(service.films()[1].title).toBe('Film 2');
    });

    it('should send the right headers and params', async () => {
        const promise = service.loadFilms();
        const req = httpMock.expectOne(req => 
        req.url.includes('now_playing') && 
        req.params.get('page') === '1'
        );

        expect(req.request.headers.has('Authorization')).toBe(true);
        expect(req.request.params.get('language')).toBe('en');
        expect(req.request.params.get('page')).toBe('1');

        req.flush(mockAPIResponse);
        await promise;
    });

});