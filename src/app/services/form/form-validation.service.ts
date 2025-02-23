import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  passwordMatchValidator(control: AbstractControl) {
    return control.get('password')?.value ===
      control.get('confirm_password')?.value
      ? null
      : { mismatch: true };
  }

  // Regex-based email validator
  emailPatternValidator(): ValidatorFn {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return (control: AbstractControl) => {
      const email = control.value;
      if (email && !emailRegex.test(email)) {
        return { invalidEmail: true };
      }
      return null;
    };
  }

  isFieldError(
    form: AbstractControl,
    field: string,
    isFormSubmitted: boolean
  ): boolean | undefined {
    const control = form.get(field);
    return (
      (control?.touched && control?.invalid) ||
      (control?.invalid && isFormSubmitted)
    );
  }

  getErrorMessage(form: AbstractControl, field: string): string {
    const control = form.get(field);
    if (control?.hasError('required')) {
      return 'This field is required';
    } else if (control?.hasError('minlength')) {
      const minLength = control.errors?.['minlength'].requiredLength;
      return `Minimum length is ${minLength} characters`;
    } else if (control?.hasError('invalidEmail')) {
      return 'Invalid email format';
    } else if (field === 'confirm_password' && form.hasError('mismatch')) {
      return 'Passwords do not match';
    }
    return '';
  }
}
