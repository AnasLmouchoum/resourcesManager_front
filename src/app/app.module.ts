import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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
    ImprimanteDisponibleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
