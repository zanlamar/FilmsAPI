import { Component, signal } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true,
})
export class Login {
  email = '';
  password = '';
  errorMessage = signal('');
  loading = signal(false);

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  async onLogin() {
    this.loading.set(true);
    this.errorMessage.set('');

    const result = await this.authService.login(this.email, this.password);

    if (result.success) {
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
      this.router.navigateByUrl(returnUrl);
    } else {
      this.errorMessage.set('Invalid password or email');
    }
    this.loading.set(false);
  }
}
