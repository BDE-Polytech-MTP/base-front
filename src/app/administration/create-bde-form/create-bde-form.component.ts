import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateSpecialtyModalComponent } from '../create-specialty-modal/create-specialty-modal.component';
import { BdeService } from '../../services/bde.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-create-bde-form',
  templateUrl: './create-bde-form.component.html',
  styleUrls: ['./create-bde-form.component.scss']
})
export class CreateBdeFormComponent implements OnInit {

  error?: string;
  success?: string;
  sending = false;
  bdeName = '';
  ownerEmail = '';
  token = '';
  specialties: { name: string, minYear: number, maxYear: number }[] = [];

  constructor(public dialog: MatDialog, public bdeService: BdeService) { }

  ngOnInit(): void {
  }

  openSpecialtyDialog() {
    const dialogRef = this.dialog.open(CreateSpecialtyModalComponent, {
      data: { exclude: this.specialties.map(spe => spe.name) }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.specialties.push({
          name: result.name.trim().toUpperCase(),
          minYear: result.minYear,
          maxYear: result.maxYear,
        });
      }
    });
  }

  deleteSpecialty(specialty: string) {
    this.specialties = this.specialties.filter((spe) => spe.name !== specialty);
  }

  sendCreationRequest() {
    this.sending = true;
    this.error = this.success = undefined;
    this.bdeService.createBDE(this.bdeName, this.ownerEmail, this.specialties, this.token.length ? this.token : undefined).subscribe(
      () => {
        this.success = 'BDE créé !';
        this.sending = false;
      },
      (err: HttpErrorResponse) => {
        if (err.status === 400) { // Bad request
          this.error = 'Un BDE avec ce nom existe déjà.';
        } else {
          this.error = 'Une erreur est survenue sur le serveur. Contactez un adminstrateur ou ré-essayez plus tard.';
        }
        this.sending = false;
      },
    );
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.specialties, event.previousIndex, event.currentIndex);
  }

}
