import { Routes } from '@angular/router';
import { Home } from './home/home';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'welcome', component: Home },
  { path: 'login', component: Home }, // Replace with actual Login component later
  { path: 'register', component: Home }, // Replace with actual Register component later
  { path: '**', redirectTo: '/welcome' } // Wildcard route for 404 page
];