import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { App } from './app';
import { AuthService } from './shared/services/auth.service';

describe('App component', () => {
  let component: App;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate'], { url: '/home' });

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    component = TestBed.runInInjectionContext(() => new App());
  });

  it('should call AuthService.logout() when logout is called', () => {
    component.onLogout();
    expect(authServiceSpy.logout).toHaveBeenCalled();
  });

});
