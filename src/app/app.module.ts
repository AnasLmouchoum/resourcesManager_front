import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HeadMenuComponent } from './components/head-menu/head-menu.component';
import { DeaprtementComponent } from './gestion-departements/deaprtement/deaprtement.component';
import { MembreComponent } from './gestion-departements/membre/membre.component';
import { FooterComponent } from './components/footer/footer.component';
import { BesoinComponent } from './gestionBesoin/besoin/besoin.component';
import { ListeBesoinComponent } from './gestionBesoin/liste-besoin/liste-besoin.component';
import { AppelOffreComponent } from './appel-offre/appel-offre.component';
import { OffreComponent } from './offre/offre.component';
import { OrdinateurComponent } from './gestionRessource/ordinateur/ordinateur.component';
import { ImprimanteComponent } from './gestionRessource/imprimante/imprimante.component';
import { OrdinateurDisponibleComponent } from './gestionRessource/ordinateur-disponible/ordinateur-disponible.component';
import { ImprimanteDisponibleComponent } from './gestionRessource/imprimante-disponible/imprimante-disponible.component';
import { SignalerPanneComponent } from './gestionPannes/signaler-panne/signaler-panne.component';
import { PannesMemberDepartementComponent } from './gestionPannes/pannes-member-departement/pannes-member-departement.component';
import { PannesTechnicienComponent } from './gestionPannes/pannes-technicien/pannes-technicien.component';
import { ConstatesResponsableComponent } from './gestionPannes/constates-responsable/constates-responsable.component';
import { TechnicienComponent } from './gestionPannes/technicien/technicien/technicien.component';
import { ForbiddenComponent } from './auth/forbidden/forbidden.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { PageNotFoundComponent } from './auth/page-not-found/page-not-found.component';
import { RegisterComponent } from './auth/register/register.component';
import { ServerErrorComponent } from './auth/server-error/server-error.component';
import { ToastComponent } from './toast/toast.component';
import { ToasterComponent } from './toaster/toaster.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { HomeComponent } from './Home/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeadMenuComponent,
    DeaprtementComponent,
    MembreComponent,
    FooterComponent,
    BesoinComponent,
    ListeBesoinComponent,
    AppelOffreComponent,
    OffreComponent,
    OrdinateurComponent,
    ImprimanteComponent,
    OrdinateurDisponibleComponent,
    ImprimanteDisponibleComponent,
    SignalerPanneComponent,
    PannesMemberDepartementComponent,
    PannesTechnicienComponent,
    ConstatesResponsableComponent,
    TechnicienComponent,
    LoginComponent,
    RegisterComponent,
    ToastComponent,
    ToasterComponent,
    LogoutComponent,
    ServerErrorComponent,
    PageNotFoundComponent,
    ForbiddenComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
