import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterFormComponent } from './register-form/register-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { HomeComponent } from './pages/home/home.component';
import { ConnectedGuard } from './guards/connected.guard';
import { EventsListComponent } from './events-list/events-list.component';


const routes: Routes = [
  { path: 'account/confirm', component: RegisterFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'events', component: EventsListComponent },
  { path: 'bde', loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule) },
  { path: '', component: HomeComponent, canActivate: [ConnectedGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
