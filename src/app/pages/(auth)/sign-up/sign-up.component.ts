import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SignUpDataType } from '@app/interface';
import { AuthService } from '@app/services/auth/auth.service';
import { FormValidationService } from '@app/services/form/form-validation.service';
import { ToastrService } from 'ngx-toastr';
import { OauthComponent } from '@components/Oauth/oauth.component';
import { Eye, LucideAngularModule, EyeOff } from 'lucide-angular';
@Component({
  selector: 'app-sign-up',
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    OauthComponent,
    LucideAngularModule,
  ],
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent implements OnInit {
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly authService: AuthService = inject(AuthService);
  private readonly validationService: FormValidationService = inject(
    FormValidationService
  );
  private readonly toast: ToastrService = inject(ToastrService);
  private readonly router: Router = inject(Router);
  readonly icons = { Eye, EyeOff };

  public showPassword = signal(false);

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

  togglePasswordView() {
    this.showPassword.update((prev) => !prev);
  }

  onSubmit(): void {
    this.isFormSubmitted = true;
    if (this.signUpForm.valid) {
      this.isLoading = true;
      console.log(this.signUpForm.value);
      this.authService
        .signUp(this.signUpForm.value as SignUpDataType)
        .subscribe((data) => {
          if (data.error) {
            this.isLoading = false;
            console.log('signup error', data);
            this.toast.error(data.error.message);
          }
          if (data.data) {
            this.isLoading = false;
            this.router.navigate(['/sign-in']);
          }
        });
    }
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
