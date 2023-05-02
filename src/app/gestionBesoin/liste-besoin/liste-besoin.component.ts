import { Component } from '@angular/core';
import { Besoin, Departement } from 'src/app/classes/Classes';
import { GestionBesoinsService } from 'src/app/services/gestion-besoins.service';
import { GestionDepartementsService } from 'src/app/services/gestion-departements.service';
declare var $: any;

@Component({
  selector: 'app-liste-besoin',
  templateUrl: './liste-besoin.component.html',
  styleUrls: ['./liste-besoin.component.css']
})
export class ListeBesoinComponent {

  public listeBesoinsByDepartement: Besoin[] = [];
  public departements: Departement[] = [];
  public selectedBesoin!: Besoin;
  userId!: string;
  idDepartement!: number;
  public constructor(private gestionBesoinsService: GestionBesoinsService,
                    private gestionDepartementsService: GestionDepartementsService) {}

  ngOnInit(): void {
    this.getBesoinsByDepartement();
    this.getDepartements();
    this.userId = localStorage.getItem('userId')!;
    this.idDepartement = Number(localStorage.getItem('departementId')!);
  }

  public getBesoinsByDepartement() {
    let idDepartement = this.idDepartement // extract idDepartemnt from the current user
    this.gestionBesoinsService.getBesoinsByIdDepartement(idDepartement).subscribe({
      next: (data) => {
        this.listeBesoinsByDepartement = data;
      },
      error: (error) => console.log(error)
    })
  }

  public getDepartements(): void {
    this.gestionDepartementsService.getAllDepartements().subscribe({
      next: (data: Departement[]) => {
        this.departements = data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  public getDepartementName(idDepartement: number): string {
    return this.departements.filter((dep) => dep.id == idDepartement)[0]?.nomDepartement
  }

  public showRessourcesBesoin(besoin: Besoin) {
    this.selectedBesoin = besoin;
  }

  public sendBesoinsRequest() {
    let idDepartement = this.idDepartement // extract from the current chef Departement !!
    this.gestionBesoinsService.sendBesoinsRequest(idDepartement).subscribe({
      next: () => {console.log("done")},
      error: (error) => console.log(error)
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      $(document).ready(function() {
        $('#listeBesoinTable').DataTable();
      });
    }, 500);
  }

}
