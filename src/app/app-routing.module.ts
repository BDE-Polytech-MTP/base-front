import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterFormComponent } from './register-form/register-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { HomeComponent } from './pages/home/home.component';
import { ConnectedGuard } from './guards/connected.guard';
import { EventsListComponent } from './events-list/events-list.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { UserProfilComponent } from './user-profil/user-profil.component';
import { PartnersComponent } from './partners/partners.component';
import { AccountRequestFormComponent } from './account-request/account-request.component';


const routes: Routes = [
  { path: 'account/confirm', component: RegisterFormComponent },
  { path: 'register', component: AccountRequestFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'events', component: EventsListComponent, canActivate: [ConnectedGuard]  },
  { path: 'bde', loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule) },
  { path: 'events/:event_id/bookings/:user_id', component: BookingDetailsComponent, canActivate: [ConnectedGuard]  },
  { path: 'users/:uuid', component: UserProfilComponent, canActivate: [ConnectedGuard] },
  { path: 'partners', component: PartnersComponent},
  { path: '', component: HomeComponent, canActivate: [ConnectedGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
