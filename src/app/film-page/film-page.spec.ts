import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilmPage } from './film-page';
import { APIfilmService } from '../shared/services/API-film-details.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FilmDetail } from '../shared/models/film-details';

describe('FilmPage Component', () => {
  let component: FilmPage;
  let fixture: ComponentFixture<FilmPage>;
  let mockAPIfilmService: jasmine.SpyObj<APIfilmService>;
  let mockActivatedRoute: any;

  const mockFilmDetail: FilmDetail = {
    id: 1,
    title: 'Película Test',
    poster_path: '/path.jpg',
    overview: 'Descripción de prueba',
    original_language: 'en',
    release_date: '2024-01-01',
    vote_average: 8.5,
    genres: [
      { id: 1, name: 'Action' },
      { id: 2, name: 'Drama' }
    ]
  };

  beforeEach(async () => {
    mockAPIfilmService = jasmine.createSpyObj(
      'APIfilmService', 
      ['showFilm', 'showCast', 'showRecommended'],
      {
        film: signal(mockFilmDetail),
        cast: signal([]),
        recommended: signal([]),
        loading: signal(false),
        error: signal(false)
      }
    );

    mockActivatedRoute = {
      params: of({ id: '1' })
    };

    await TestBed.configureTestingModule({
      imports: [FilmPage, CommonModule, RouterLink],
      providers: [
        { provide: APIfilmService, useValue: mockAPIfilmService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FilmPage);
    component = fixture.componentInstance;
  });

  it('should call  showFilm, showCast and showRecommended of the correct ID', (done) => {
    fixture.detectChanges();

    setTimeout(() => {
      expect(mockAPIfilmService.showFilm).toHaveBeenCalledWith(1);
      expect(mockAPIfilmService.showCast).toHaveBeenCalledWith(1);
      expect(mockAPIfilmService.showRecommended).toHaveBeenCalledWith(1);
      done();
    }, 100);
  });

});