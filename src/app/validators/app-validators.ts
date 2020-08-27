import { ValidatorFn, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import { DateTime } from 'luxon';

export class AppValidators {

    /** Trimmed min length check */
    static trimmedMinLength(minLength: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const actualLength: number = control.value.trim().length;
            return actualLength < minLength ? { min: { min: minLength, actual: actualLength } } : null;
        };
    }

    static selfCrossed(fields: string[], validationFunc: ((value: {[key: string]: any}) => ValidationErrors | null)): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const values = { self: control.value };
            fields.forEach((fieldName) => {
                const field = control.root.get(fieldName);
                if (field) {
                    values[fieldName] = field.value;
                }
            });
            return validationFunc(values);
        };
    }

    static crossed(fields: string[], validationFunc: ((value: {[key: string]: any}) => ValidationErrors | null)): ValidatorFn {
        return (form: FormGroup): ValidationErrors | null => {
            const values = {};
            fields.forEach((fieldName) => {
                const field = form.get(fieldName);
                if (field) {
                    values[fieldName] = field.value;
                }
            });
            return validationFunc(values);
        };
    }

    static datetime(format: string = 'dd/MM/yyyy hh:mm'): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {

            if (control.value.length === 0) {
                return null;
            }

            const value = DateTime.fromFormat(control.value, format, { locale: 'fr' });
            if (value.isValid) {
                return null;
            }
            return { datetime: true };
        };
    }

}
