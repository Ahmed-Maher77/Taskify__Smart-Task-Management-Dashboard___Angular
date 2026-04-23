import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [FormsModule],
})
export class Login {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  loginData = {
    email: '',
    password: '',
  };
  errorMessage = '';
  readonly isSubmitting = signal(false);

  async onSubmit(): Promise<void> {
    this.errorMessage = '';
    this.isSubmitting.set(true);

    try {
      const isValidUser = await this.authService.login(this.loginData.email, this.loginData.password);

      if (!isValidUser) {
        this.errorMessage = 'Invalid email or password.';
        return;
      }

      this.router.navigateByUrl('/profile');
    } finally {
      queueMicrotask(() => this.isSubmitting.set(false));
    }
  }
}
