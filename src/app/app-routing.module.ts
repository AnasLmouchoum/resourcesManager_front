import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeaprtementComponent } from './gestion-departements/deaprtement/deaprtement.component';
import { MembreComponent } from './gestion-departements/membre/membre.component';
import { BesoinComponent } from './gestionBesoin/besoin/besoin.component';
import { ListeBesoinComponent } from './gestionBesoin/liste-besoin/liste-besoin.component';
import { AppelOffreComponent } from './appel-offre/appel-offre.component';
import { OffreComponent } from './offre/offre.component';
import { OrdinateurComponent } from './gestionRessource/ordinateur/ordinateur.component';

import { ImprimanteComponent } from './gestionRessource/imprimante/imprimante.component';
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
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { UpdatePasswordComponent } from './auth/update-password/update-password.component';
import { ConfirmRegistrationComponent } from './auth/confirm-registration/confirm-registration.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'validateResetPassword/**', component: UpdatePasswordComponent },
  { path: 'registrationConfirm', component: ConfirmRegistrationComponent },
  { path: 'validateResetPassword', component: UpdatePasswordComponent },
  // responsable
  {
    path: 'departements',
    component: DeaprtementComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: { role: ['ROLE_RESPONSABLE'] },
  },
  {
    path: 'membres',
    component: MembreComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: { role: ['ROLE_RESPONSABLE'] },
  },
  {
    path: 'appelOffre',
    component: AppelOffreComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: { role: ['ROLE_RESPONSABLE'] },
  },
  {
    path: 'ressources/imprimantes',
    component: ImprimanteComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: { role: ['ROLE_RESPONSABLE'] },
  },
  {
    path: 'ressources/ordinateurs',
    component: OrdinateurComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: { role: ['ROLE_RESPONSABLE'] },
  },
  {
    path: 'responsable/constats',
    component: ConstatesResponsableComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: { role: ['ROLE_RESPONSABLE'] },
  },
  {
    path: 'techniciens',
    component: TechnicienComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: { role: ['ROLE_RESPONSABLE'] },
  },
  // chef departement
  {
    path: 'addBesoins',
    component: BesoinComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: { role: ['ROLE_ENSEIGNANT', 'ROLE_CHEF_DEPARTEMENT'] },
  },
  {
    path: 'listeBesoin',
    component: ListeBesoinComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: { role: ['ROLE_CHEF_DEPARTEMENT'] },
  },
  // enseignant
  {
    path: 'signalerPanne',
    component: SignalerPanneComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: { role: ['ROLE_ENSEIGNANT'] },
  },
  {
    path: 'membresDepartement/pannes',
    component: PannesMemberDepartementComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: { role: ['ROLE_ENSEIGNANT'] },
  },
  // technicien
  {
    path: 'technicien/pannes',
    component: PannesTechnicienComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: { role: ['ROLE_TECHNICIEN'] },
  },
  // fournisseur
  {
    path: 'offre',
    component: OffreComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: { role: ['ROLE_FOURNISSEUR'] },
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
