import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterFormComponent } from './register-form/register-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { CreateBdeFormComponent } from './create-bde-form/create-bde-form.component';
import { CreateUserFormComponent } from './create-user-form/create-user-form.component';
import { HomeComponent } from './pages/home/home.component';
import { ConnectedGuard } from './guards/connected.guard';


const routes: Routes = [
  { path: 'account/confirm', component: RegisterFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'bde', component: CreateBdeFormComponent },
  { path: 'account/create', component: CreateUserFormComponent, canActivate: [ConnectedGuard] },
  { path: '', component: HomeComponent, canActivate: [ConnectedGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
