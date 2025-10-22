import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('Login Component', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['login']);

    mockRouter = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl']);

    mockActivatedRoute = {
      snapshot: {
        queryParams: {}
      }
    };

    await TestBed.configureTestingModule({
      imports: [Login, CommonModule, FormsModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
  });

  it('should call AuthService.login with correct email and password', async () => {
    component.email = 'test@example.com';
    component.password = 'password123';

    mockAuthService.login.and.returnValue(Promise.resolve({ success: true, user: {} as any }));

    await component.onLogin();

    expect(mockAuthService.login).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  it('should redirect to /home when login is successful, without returnUrl', async () => {
    component.email = 'test@example.com';
    component.password = 'password123';
    mockActivatedRoute.snapshot.queryParams = {};

    mockAuthService.login.and.returnValue(Promise.resolve({ 
      success: true, 
      user: {} as any  
    }));

    await component.onLogin();

    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/home');
  });

});