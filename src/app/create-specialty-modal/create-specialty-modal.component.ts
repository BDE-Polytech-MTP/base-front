import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateBdeFormComponent } from '../create-bde-form/create-bde-form.component';

export interface DialogData {
  exclude: string[];
  specialty: string;
}

@Component({
  selector: 'app-create-specialty-modal',
  templateUrl: './create-specialty-modal.component.html',
  styleUrls: ['./create-specialty-modal.component.scss']
})
export class CreateSpecialtyModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateBdeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
