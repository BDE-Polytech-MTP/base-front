import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateBdeFormComponent } from './create-bde-form/create-bde-form.component';
import { CreateUserFormComponent } from './create-user-form/create-user-form.component';
import { ConnectedGuard } from '../guards/connected.guard';
import { BdeProfilComponent } from './bde-profil/bde-profil.component';


const routes: Routes = [
  { path: 'create', component: CreateBdeFormComponent },
  { path: 'users/add', component: CreateUserFormComponent, canActivate: [ConnectedGuard] },
  { path: 'profil', component: BdeProfilComponent, canActivate: [ConnectedGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
