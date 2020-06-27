import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateBdeFormComponent } from '../create-bde-form/create-bde-form.component';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AppValidators } from '../validators/app-validators';

export interface DialogData {
  exclude: string[];
}

const minMaxValidator = AppValidators.crossed(['minYear', 'maxYear'], (values) => {
  return values.minYear === undefined ||
         values.maxYear === undefined ||
         values.maxYear < values.minYear ? { minMax: { min: values.minYear, max: values.maxYear } } : null;
});


const notIn = (values: string[]): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
        const actualValue: string = control.value.trim().toUpperCase();
        if (values.indexOf(actualValue) !== -1) {
          return { takenName: true };
        }
        return null;
    };
};

@Component({
  selector: 'app-create-specialty-modal',
  templateUrl: './create-specialty-modal.component.html',
  styleUrls: ['./create-specialty-modal.component.scss']
})
export class CreateSpecialtyModalComponent implements OnInit {

  specialtyForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CreateBdeFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogData
  ) { }

  ngOnInit(): void {
    this.specialtyForm = new FormGroup({
      name: new FormControl('', [Validators.required, AppValidators.trimmedMinLength(2), notIn(this.data.exclude)]),
      minYear: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(5)]),
      maxYear: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(5)]),
    }, {
      validators: [minMaxValidator]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
