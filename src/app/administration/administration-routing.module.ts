import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateBdeFormComponent } from './create-bde-form/create-bde-form.component';
import { CreateUserFormComponent } from './create-user-form/create-user-form.component';
import { ConnectedGuard } from '../guards/connected.guard';
import { BdeProfilComponent } from './bde-profil/bde-profil.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { ManageEventComponent } from './manage-event/manage-event.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserRequestsListComponent } from './user-requests-list/user-requests-list.component';

const routes: Routes = [
  { path: 'create', component: CreateBdeFormComponent },
  { path: 'users/add', component: CreateUserFormComponent, canActivate: [ConnectedGuard] },
  { path: 'users/list', component: UsersListComponent, canActivate: [ConnectedGuard] },
  { path: 'users/requests', component: UserRequestsListComponent, canActivate: [ConnectedGuard] },
  { path: 'profil', component: BdeProfilComponent, canActivate: [ConnectedGuard] },
  { path: 'events/new', component: CreateEventComponent, canActivate: [ConnectedGuard] },
  { path: 'events/:event_id', component: ManageEventComponent, canActivate: [ConnectedGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
