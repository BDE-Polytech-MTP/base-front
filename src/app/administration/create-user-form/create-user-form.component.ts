import { Component, OnInit } from '@angular/core';
import { BdeService } from '../../services/bde.service';
import { UsersService } from '../../services/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

function minLengthIfNotEmpty(minLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const actualLength: number = control.value.trim().length;
    return actualLength > 0 && actualLength < minLength ? { min: { min: minLength, actual: actualLength } } : null;
  };
}

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrls: ['./create-user-form.component.scss']
})
export class CreateUserFormComponent implements OnInit {

  bdes: { bdeName: string, bdeUUID: string }[] = [];

  createUserForm = new FormGroup({
    bde: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    firstname: new FormControl('', [minLengthIfNotEmpty(2), Validators.maxLength(15)]),
    lastname: new FormControl('', [minLengthIfNotEmpty(2), Validators.maxLength(15)]),
    member: new FormControl(false)
  });

  get bde() {
    return this.createUserForm.get('bde');
  }

  get email() {
    return this.createUserForm.get('email');
  }

  get firstname() {
    return this.createUserForm.get('firstname');
  }

  get lastname() {
    return this.createUserForm.get('lastname');
  }

  get member() {
    return this.createUserForm.get('member');
  }

  error?: string;
  success?: string;
  sending = false;

  constructor(private bdeService: BdeService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.bdeService.listAllBDEs().subscribe(
      (bdes) => this.bdes = bdes
    );
  }

  createUser() {
    this.sending = true;
    this.error = undefined;
    this.success = undefined;

    this.usersService.createUser(
      this.createUserForm.value.bde,
      this.createUserForm.value.email,
      this.createUserForm.value.member,
      this.createUserForm.value.firstname.trim(),
      this.createUserForm.value.lastname.trim()
    ).subscribe(
      () => {
        this.success = 'Compté créé !';
        this.sending = false;
      },
      (error: HttpErrorResponse) => {
        if (error.status === 400) {
          this.error = 'L\'email indiqué est déjà utilisé.';
        } else if (error.status === 401) { // Should not happen : connected guard will prevent disconnected user to access this form.
          this.error = 'Vous devez être connecté pour effectuer cette action.';
        } else if (error.status === 403) {
          this.error = 'Vous n\'avez pas le permission d\'effectuer cette action.';
        } else {
          this.error = 'Impossible de créer l\'utilisateur. Contactez un administrateur ou ré-essayez plus tard.';
        }
        this.sending = false;
      }
    );
  }

}
