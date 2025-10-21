import { Routes } from '@angular/router';
import { Home } from './home/home';
import { FilmPage } from './film-page/film-page';
import { Login } from './login/login';
import { Register } from './register/register';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: Home, canActivate: [authGuard] },
  { path: 'film/:id', component: FilmPage, canActivate: [authGuard] },
  { path: 'login', component: Login }, 
  { path: 'register', component: Register }, 
  { path: '**', redirectTo: '/login' } //wildcard
];