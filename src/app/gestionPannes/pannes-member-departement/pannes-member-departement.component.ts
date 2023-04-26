import { Component, OnInit } from '@angular/core';
import { Panne, Ressource } from 'src/app/classes/Classes';
import { GestionPannesService } from '../../services/gestion-pannes.service';
import { HttpErrorResponse } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-pannes-member-departement',
  templateUrl: './pannes-member-departement.component.html',
  styleUrls: ['./pannes-member-departement.component.css'],
})
export class PannesMemberDepartementComponent {
  public Pannes!: Panne[];
  public Ressources!: Ressource[];

  constructor(private gestionPannesService: GestionPannesService) {}

  ngOnInit(): void {
    this.loadPannes();
    this.loadRessources();
  }

  public loadPannes() {
    this.Pannes = [];
    this.getmemberDepartementPannes();
  }

  public loadRessources() {
    this.Ressources = [];
    this.getmemberDepartementRessources();
  }

  public getmemberDepartementPannes(): void {
    this.gestionPannesService.getMemberDepartementPannes('ac068373-69ce-4d7d-84dd-ca89419588e9').subscribe({ //to extract from the current user
      next: (data: Panne[]) => {
        this.Pannes = data;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
    this.gestionPannesService.getMemberDepartementRessources;
  }

  public getmemberDepartementRessources(): void {
    this.gestionPannesService.getMemberDepartementRessources('ac068373-69ce-4d7d-84dd-ca89419588e9').subscribe({ //to extract from the current user
      next: (data: Ressource[]) => {
        this.Ressources = data;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  public getRessource(idRessource: number | null): Ressource | null {
    return this.Ressources.filter(
      (ressource) => ressource.id === idRessource
    )[0];
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      $(document).ready(function () {
        $('#pannesTable').DataTable();
      });
    }, 500);
  }
}
