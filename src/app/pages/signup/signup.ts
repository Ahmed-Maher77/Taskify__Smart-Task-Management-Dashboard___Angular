import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.html',
  styleUrl: './signup.css',
  imports: [CommonModule, ReactiveFormsModule],
})
export class Signup {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  isSubmitted = false;
  errorMessage = '';
  readonly isSubmitting = signal(false);

  signupForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  async onSubmit(): Promise<void> {
    this.isSubmitted = true;
    this.errorMessage = '';

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    try {
      await this.authService.signup({
        fullName: this.signupForm.controls.fullName.value ?? '',
        email: this.signupForm.controls.email.value ?? '',
        password: this.signupForm.controls.password.value ?? '',
      });

      this.router.navigateByUrl('/profile');
    } catch (error) {
      this.errorMessage = error instanceof Error ? error.message : 'Unable to sign up now. Please try again.';
    } finally {
      queueMicrotask(() => this.isSubmitting.set(false));
    }
  }
}
