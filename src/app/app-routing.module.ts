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
import { ForbiddenComponent } from './auth/forbidden/forbidden.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { PageNotFoundComponent } from './auth/page-not-found/page-not-found.component';
import { RegisterComponent } from './auth/register/register.component';
import { ServerErrorComponent } from './auth/server-error/server-error.component';
import { HomeComponent } from './Home/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { HasRoleGuard } from './guards/has-role.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
  { path: 'server-error', component: ServerErrorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'not-found', component: PageNotFoundComponent },
  // responsable
  { path: 'departements', component: DeaprtementComponent, canActivate: [AuthGuard, HasRoleGuard], data: { role: ['responsable'] } },
  { path: 'membres', component: MembreComponent, canActivate: [AuthGuard, HasRoleGuard], data: { role: ['responsable'] } },
  { path: 'appelOffre', component: AppelOffreComponent, canActivate: [AuthGuard, HasRoleGuard], data: { role: ['responsable'] } },
  { path: "ressource/imprimanteDisponible", component: ImprimanteDisponibleComponent, canActivate: [AuthGuard, HasRoleGuard], data: { role: ['responsable'] } },
  { path: "ressource/imprimante", component: ImprimanteComponent, canActivate: [AuthGuard, HasRoleGuard], data: { role: ['responsable'] } },
  { path: "ressource/ordinateur", component: OrdinateurComponent, canActivate: [AuthGuard, HasRoleGuard], data: { role: ['responsable'] } },
  { path: "ressource/ordinateurDisponible", component: OrdinateurDisponibleComponent, canActivate: [AuthGuard, HasRoleGuard], data: { role: ['responsable'] } },
  { path: 'responsable/constats', component: ConstatesResponsableComponent, canActivate: [AuthGuard, HasRoleGuard], data: { role: ['responsable'] } },
  { path: 'techniciens', component: TechnicienComponent, canActivate: [AuthGuard, HasRoleGuard], data: { role: ['responsable'] } },
  // chef departement
  { path: 'addBesoins', component: BesoinComponent, canActivate: [AuthGuard, HasRoleGuard], data: { role: ['PROF', 'CHEF_DEP'] } },
  { path: 'listeBesoin', component: ListeBesoinComponent, canActivate: [AuthGuard, HasRoleGuard], data: { role: ['CHEF_DEP'] } },
  // enseignant
  { path: 'signalerPanne', component: SignalerPanneComponent, canActivate: [AuthGuard, HasRoleGuard], data: { role: ['PROF'] } },
  { path: 'membresDepartement/pannes', component: PannesMemberDepartementComponent, canActivate: [AuthGuard, HasRoleGuard], data: { role: ['PROF'] } },
  // technicien
  { path: 'technicien/pannes', component: PannesTechnicienComponent, canActivate: [AuthGuard, HasRoleGuard], data: { role: ['technicien'] } },
  // fournisseur
  { path: 'offre', component: OffreComponent, canActivate: [AuthGuard, HasRoleGuard], data: { role: ['fournisseur'] } },


  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
