import { Component, OnInit } from '@angular/core';
import { Ressource, Panne, MembreDepartement } from 'src/app/classes/Classes';
import { GestionPannesService } from '../../services/gestion-pannes.service';
import { HttpErrorResponse } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-signaler-panne',
  templateUrl: './signaler-panne.component.html',
  styleUrls: ['./signaler-panne.component.css'],
})
export class SignalerPanneComponent implements OnInit {
  public Ressources!: Ressource[];
  public pannes!: Panne[];
  public ressourcePanne: Ressource | undefined;

  constructor(private gestionPannesService: GestionPannesService) {}

  ngOnInit(): void {
    this.loadRessources();
    this.loadPannes();
  }

  public loadRessources() {
    this.Ressources = [];
    this.getmemberDepartementRessources();
  }
  public loadPannes() {
    this.pannes = [];
    this.getmemberDepartementPannes();
  }

  public getmemberDepartementRessources(): void {
    this.gestionPannesService.getMemberDepartementRessources('ac068373-69ce-4d7d-84dd-ca89419588e9').subscribe({// to extract from the current user
      next: (data: Ressource[]) => {
        this.Ressources = data;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  public getmemberDepartementPannes(): void {
    this.gestionPannesService.getMemberDepartementPannes('ac068373-69ce-4d7d-84dd-ca89419588e9').subscribe({// to extract from the current user
      next: (data: Panne[]) => {
        this.pannes = data;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  public handleSignalerPanne(): void {
    if (
      this.ressourcePanne != undefined &&
      !this.isPanneSignaler(this.ressourcePanne!.id)
    ) {
      let newPanne: Panne = {
        id: null,
        idMembreDepartement: 'ac068373-69ce-4d7d-84dd-ca89419588e9', // to extract from the current user
        explication: null,
        idRessource: this.ressourcePanne.id,
        dateApparition: new Date(),
        isTreated: false,
        constat: null,
        dateConstat: null,
        ordre: null,
        frequence: null,
        idTechnicien: null,
        demande: null,
      };
      this.gestionPannesService.addPanne(newPanne).subscribe({
        next: (data) => {
          // this.pannes.unshift(data);
        },
        error: (error) => {
          console.log(error);
        },
      });
      this.ressourcePanne = undefined;
      this.ngAfterViewInit();
    }
  }

  public isPanneSignaler(id: number | null): boolean {
    if (id == null) {
      return true;
    } else {
      // sort pannes by dateApparition
      const sortedPanneArray = this.pannes
        .filter((panne) => panne.isTreated === false)
        .sort((a, b) => {
          if (a.dateApparition === null || b.dateApparition === null) {
            return 0;
          }
          if (a.dateApparition < b.dateApparition) {
            return -1;
          } else if (a.dateApparition > b.dateApparition) {
            return 1;
          } else {
            return 0;
          }
        });

      const pannee = sortedPanneArray.filter((p) => p.idRessource === id)[0];
      if (pannee && !pannee.isTreated) {
        return true;
      } else return false;
    }
  }

  public openModal(ressource: Ressource, mode: string): void {
    if (mode == 'signalerPanne') this.ressourcePanne = ressource;
  }

  ngAfterViewInit(): void {
    this.loadPannes();
    setTimeout(() => {
      $(document).ready(function () {
        $('#ressourcesTable').DataTable();
      });
    }, 500);
  }
}
