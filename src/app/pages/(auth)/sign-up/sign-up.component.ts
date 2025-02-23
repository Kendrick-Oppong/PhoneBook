import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SignUpDataType } from '@app/interface';
import { AuthService } from '@app/services/auth/auth.service';
import { FormValidationService } from '@app/services/form/form-validation.service';

@Component({
  selector: 'app-sign-up',
  imports: [NgOptimizedImage, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly validationService: FormValidationService = inject(
    FormValidationService
  );
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);

  isFormSubmitted = false;
  isLoading = false;
  signUpForm = this.fb.group(
    {
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: [
        '',
        [Validators.required, this.validationService.emailPatternValidator()],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6)]],
    },
    { validators: this.validationService.passwordMatchValidator }
  );

  isFieldError(field: string): boolean | undefined {
    return this.validationService.isFieldError(
      this.signUpForm,
      field,
      this.isFormSubmitted
    );
  }

  getErrorMessage(field: string): string {
    return this.validationService.getErrorMessage(this.signUpForm, field);
  }

  onSubmit(): void {
    this.isFormSubmitted = true;
    if (this.signUpForm.valid) {
      this.isLoading = true;
      this.authService
        .signUp(this.signUpForm.value as SignUpDataType)
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.router.navigate(['/sign-in']);
          },
          error: () => {
            this.isLoading = false;
          },
        });
    }
  }
}
