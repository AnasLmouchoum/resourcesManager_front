import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeaprtementComponent } from './gestion-departements/deaprtement/deaprtement.component';
import { MembreComponent } from './gestion-departements/membre/membre.component';
import { BesoinComponent } from './gestionBesoin/besoin/besoin.component';

const routes: Routes = [
  {path: 'departements', component: DeaprtementComponent},
  {path: 'membres', component: MembreComponent},
  {path: 'addBesoins', component: BesoinComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
