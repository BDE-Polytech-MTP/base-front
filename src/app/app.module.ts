import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
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
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { RegisterFormComponent } from './register-form/register-form.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { HomeComponent } from './pages/home/home.component';
import { MobileNavBarComponent } from './nav-bar/mobile-nav-bar/mobile-nav-bar.component';
import { DesktopNavBarComponent } from './nav-bar/desktop-nav-bar/desktop-nav-bar.component';
import { FooterComponent } from './footer/footer.component';

import { httpInterceptorProviders } from './interceptors';
import { EventsListComponent } from './events-list/events-list.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { UserProfilComponent } from './user-profil/user-profil.component';
import { PaginatorIntlProvider } from './services/paginator-fr';
import { PartnersComponent } from './partners/partners.component';
import { AccountRequestFormComponent } from './account-request/account-request.component';
import { VoteComponent } from './vote/vote.component';
import { Call2actionComponent } from './call2action/call2action.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterFormComponent,
    NavBarComponent,
    LoginFormComponent,
    HomeComponent,
    MobileNavBarComponent,
    DesktopNavBarComponent,
    FooterComponent,
    EventsListComponent,
    BookingDetailsComponent,
    UserProfilComponent,
    PartnersComponent,
    AccountRequestFormComponent,
    VoteComponent,
    Call2actionComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule,
    MatMenuModule,
    MatListModule,
    MatDialogModule,
    MatSelectModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule
  ],
  providers: [
    httpInterceptorProviders,
    { provide: MatPaginatorIntl, useFactory: () => new PaginatorIntlProvider() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
