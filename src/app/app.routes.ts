import { Routes } from '@angular/router';
import { Home } from './home/home';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'login', component: Home }, // Replace with actual Login component later
  { path: 'register', component: Home }, // Replace with actual Register component later
  { path: '**', redirectTo: '/home' } // Wildcard route for 404 page
];