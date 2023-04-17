import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeaprtementComponent } from './gestion-departements/deaprtement/deaprtement.component';
import { MembreComponent } from './gestion-departements/membre/membre.component';
import { BesoinComponent } from './gestionBesoin/besoin/besoin.component';
import { ListeBesoinComponent } from './gestionBesoin/liste-besoin/liste-besoin.component';
import { AppelOffreComponent } from './appel-offre/appel-offre.component';
import { OffreComponent } from './offre/offre.component';

const routes: Routes = [
  {path: 'departements', component: DeaprtementComponent},
  {path: 'membres', component: MembreComponent},
  {path: 'addBesoins', component: BesoinComponent},
  {path: 'listeBesoin', component: ListeBesoinComponent},
  {path:'appelOffre',component: AppelOffreComponent},
  {path:'offre',component: OffreComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
