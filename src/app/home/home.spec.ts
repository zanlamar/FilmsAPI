import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home } from './home';
import { APIservice } from '../shared/services/API-service';
import { ScrollEndDirective } from '../shared/directives/scroll-end.directive';
import { signal } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';

describe('Home Component', () => {
    let component: Home;
    let fixture: ComponentFixture<Home>;
    let mockAPIservice: jasmine.SpyObj<APIservice>;

    beforeEach(async () => {
        mockAPIservice = jasmine.createSpyObj('APIservice', ['loadFilms'], {
        films: signal([]),
        loading: signal(false)
        });

        await TestBed.configureTestingModule({
        imports: [Home, CommonModule, RouterTestingModule, ScrollEndDirective],
        providers: [
            { provide: APIservice, useValue: mockAPIservice }
        ]
        }).compileComponents();

        fixture = TestBed.createComponent(Home);
        component = fixture.componentInstance;
    });

    it('should charge films when component is initialized', () => {
        fixture.detectChanges();

        expect(mockAPIservice.loadFilms).toHaveBeenCalled();
        expect(mockAPIservice.loadFilms).toHaveBeenCalledTimes(1);
    });

    it('should call loadFilms when onLoadMore() is called', () => {
        component.onLoadMore();
        expect(mockAPIservice.loadFilms).toHaveBeenCalled();

        component.onLoadMore();
        expect(mockAPIservice.loadFilms).toHaveBeenCalledTimes(2);
    });

    it('should call onLoadMore when scrolledToEnd directive ', () => {
        spyOn(component, 'onLoadMore');
        fixture.detectChanges();

        const filmsContainer = fixture.nativeElement.querySelector('.films-container');
        expect(filmsContainer).toBeTruthy();

        filmsContainer.dispatchEvent(new Event('scrolledToEnd'));

        expect(component.onLoadMore).toHaveBeenCalled();
    });
    });