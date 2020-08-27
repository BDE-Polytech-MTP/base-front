import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { CreateBdeFormComponent } from './create-bde-form/create-bde-form.component';
import { CreateSpecialtyModalComponent } from './create-specialty-modal/create-specialty-modal.component';
import { CreateUserFormComponent } from './create-user-form/create-user-form.component';

import { AdministrationRoutingModule } from './administration-routing.module';
import { BdeProfilComponent } from './bde-profil/bde-profil.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { ManageEventComponent } from './manage-event/manage-event.component';

@NgModule({
  declarations: [
    CreateBdeFormComponent,
    CreateSpecialtyModalComponent,
    CreateUserFormComponent,
    BdeProfilComponent,
    CreateEventComponent,
    ManageEventComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DragDropModule,
    MatMenuModule,
    MatListModule,
    MatDialogModule,
    MatSelectModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    AdministrationRoutingModule
  ],
})
export class AdministrationModule { }
