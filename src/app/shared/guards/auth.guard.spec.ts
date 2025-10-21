import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
    let authServiceSpy: jasmine.SpyObj<AuthService>;
    let routerSpy: jasmine.SpyObj<Router>;

    beforeEach(() => {
        authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
        routerSpy = jasmine.createSpyObj('Router', ['navigate'], { url: '/home' });

        TestBed.configureTestingModule({
        providers: [
            { provide: AuthService, useValue: authServiceSpy },
            { provide: Router, useValue: routerSpy }
        ]
        });
    });

    it('should return TRUE if the user is authenticated', () => {
        authServiceSpy.isAuthenticated.and.returnValue(true);

        const result = TestBed.runInInjectionContext(authGuard);

        expect(result).toBeTrue();
        expect(routerSpy.navigate).not.toHaveBeenCalled();
    });

    it('should redirect to login if the user is not authenticated', () => {
        authServiceSpy.isAuthenticated.and.returnValue(false);

        const result = TestBed.runInInjectionContext(authGuard);

        expect(result).toBeFalse();
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/login'], {
        queryParams: { returnUrl: '/home' }
        });
    });
});