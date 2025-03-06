import { NgOptimizedImage, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { SignInDataType } from '@app/interface';
import { AuthService } from '@app/services/auth/auth.service';
import { FormValidationService } from '@app/services/form/form-validation.service';
import { ToastrService } from 'ngx-toastr';
import { OauthComponent } from '@components/Oauth/oauth.component';

@Component({
  selector: 'app-sign-in',
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    OauthComponent,
  ],
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly validationService: FormValidationService = inject(
    FormValidationService
  );
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);
  private readonly toast: ToastrService = inject(ToastrService);

  isFormSubmitted = false;
  isLoading = false;
  signInForm = this.fb.group({
    email: [
      '',
      [Validators.required, this.validationService.emailPatternValidator()],
    ],
    password: ['', Validators.required],
  });

  isFieldError(field: string): boolean | undefined {
    return this.validationService.isFieldError(
      this.signInForm,
      field,
      this.isFormSubmitted
    );
  }

  getErrorMessage(field: string): string {
    return this.validationService.getErrorMessage(this.signInForm, field);
  }

  onSubmit(): void {
    this.isFormSubmitted = true;
    if (this.signInForm.valid) {
      this.isLoading = true;
      this.authService
        .signIn(this.signInForm.value as SignInDataType)
        .subscribe((data) => {
          if (data.error) {
            this.isLoading = false;
            console.log('login error', data.error.message);
            this.toast.error(data.error.message);
          }
          if (data.data?.user) {
            this.isLoading = false;
            // this.router.navigate(['/dashboard']);
          }
        });
    }
  }
}
