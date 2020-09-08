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
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { CreateBdeFormComponent } from './create-bde-form/create-bde-form.component';
import { CreateSpecialtyModalComponent } from './create-specialty-modal/create-specialty-modal.component';
import { CreateUserFormComponent } from './create-user-form/create-user-form.component';

import { AdministrationRoutingModule } from './administration-routing.module';
import { BdeProfilComponent } from './bde-profil/bde-profil.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { ManageEventComponent } from './manage-event/manage-event.component';
import { UsersListComponent } from './users-list/users-list.component';

class PaginatorIntlProvider extends MatPaginatorIntl {

  firstPageLabel = 'Première page';
  itemsPerPageLabel = 'Éléments par page';
  lastPageLabel = 'Dernière page';
  nextPageLabel = 'Prochaine page';
  previousPageLabel = 'Page précédente';

  getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 sur ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return `${startIndex + 1} – ${endIndex} sur ${length}`;
  }

}

@NgModule({
  declarations: [
    CreateBdeFormComponent,
    CreateSpecialtyModalComponent,
    CreateUserFormComponent,
    BdeProfilComponent,
    CreateEventComponent,
    ManageEventComponent,
    UsersListComponent,
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
    MatPaginatorModule,
    MatTableModule,
    AdministrationRoutingModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useFactory: () => new PaginatorIntlProvider() }
  ]
})
export class AdministrationModule { }
