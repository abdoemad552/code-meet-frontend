import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function uuidValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const uuid = control.value;
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/i;

    return uuidRegex.test(uuid) ? null : { invalidUuid: true };
  };
}
