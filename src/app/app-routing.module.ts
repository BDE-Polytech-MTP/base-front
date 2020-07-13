import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterFormComponent } from './register-form/register-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { HomeComponent } from './pages/home/home.component';
import { ConnectedGuard } from './guards/connected.guard';


const routes: Routes = [
  { path: 'account/confirm', component: RegisterFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: '', component: HomeComponent, canActivate: [ConnectedGuard] },
  { path: 'bde', loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
