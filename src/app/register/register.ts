import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';  

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
  standalone: true,
})
export class Register {

  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = signal('');
  loading = signal(false);

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  async onRegister() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage.set('Las contraseñas no coinciden');
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage.set('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    const result = await this.authService.register(this.email, this.password);

    if (result. success) {
      this.router.navigate(['/home']);
    } else {
      if (result.error?.includes('email-already-in-use')) {
        this.errorMessage.set('Este email ya está registrado');
      } else if (result.error?.includes('invalid-email')) {
        this.errorMessage.set('El email no es válido');
      } else if (result.error?.includes('weak-password')) {
        this.errorMessage.set('La contraseña es muy débil');
      } else {
        this.errorMessage.set('Error al registrarse. Inténtalo de nuevo');
      }
    }
    this.loading.set(false);
  }
}