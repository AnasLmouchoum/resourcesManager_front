import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeaprtementComponent } from './gestion-departements/deaprtement/deaprtement.component';
import { MembreComponent } from './gestion-departements/membre/membre.component';
import { BesoinComponent } from './gestionBesoin/besoin/besoin.component';
import { ListeBesoinComponent } from './gestionBesoin/liste-besoin/liste-besoin.component';
import { AppelOffreComponent } from './appel-offre/appel-offre.component';
import { OffreComponent } from './offre/offre.component';
import { OrdinateurComponent } from './gestionRessource/ordinateur/ordinateur.component';
import { OrdinateurDisponibleComponent } from './gestionRessource/ordinateur-disponible/ordinateur-disponible.component';
import { ImprimanteComponent } from './gestionRessource/imprimante/imprimante.component';
import { ImprimanteDisponibleComponent } from './gestionRessource/imprimante-disponible/imprimante-disponible.component';
import { SignalerPanneComponent } from './gestionPannes/signaler-panne/signaler-panne.component';
import { PannesMemberDepartementComponent } from './gestionPannes/pannes-member-departement/pannes-member-departement.component';
import { PannesTechnicienComponent } from './gestionPannes/pannes-technicien/pannes-technicien.component';
import { ConstatesResponsableComponent } from './gestionPannes/constates-responsable/constates-responsable.component';
import { TechnicienComponent } from './gestionPannes/technicien/technicien/technicien.component';

const routes: Routes = [
  {path: 'departements', component: DeaprtementComponent},
  {path: 'membres', component: MembreComponent},
  {path: 'addBesoins', component: BesoinComponent},
  {path: 'listeBesoin', component: ListeBesoinComponent},
  {path:'appelOffre',component: AppelOffreComponent},
  {path:'offre',component: OffreComponent},
  {path :"ressource/ordinateur",component :OrdinateurComponent},
  {path :"ressource/ordinateurDisponible",component :OrdinateurDisponibleComponent},
  {path :"ressource/imprimanteDisponible",component :ImprimanteDisponibleComponent},
  {path :"ressource/imprimante",component :ImprimanteComponent},
  { path: 'signalerPanne', component: SignalerPanneComponent },
  {
    path: 'membresDepartement/pannes',
    component: PannesMemberDepartementComponent,
  },
  {
    path: 'technicien/pannes',
    component: PannesTechnicienComponent,
  },
  {
    path: 'responsable/constats',
    component: ConstatesResponsableComponent,
  },
  {
    path: 'techniciens',
    component: TechnicienComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
