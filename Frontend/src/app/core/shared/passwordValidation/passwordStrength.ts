import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordStrength(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value || '';
    const isValid = /[A-Za-z]/.test(value) && /[0-9]/.test(value);
    return isValid ? null : { passwordStrength: true };
  };
}
