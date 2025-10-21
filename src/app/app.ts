import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
  authService = inject(AuthService);
  router = inject(Router);

  protected readonly title = signal('FilmsAPI');
  
  onLogout() {
    this.authService.logout();
  }

  
}