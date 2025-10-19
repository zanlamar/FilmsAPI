import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmPage } from './film-page';

describe('FilmPage', () => {
  let component: FilmPage;
  let fixture: ComponentFixture<FilmPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
