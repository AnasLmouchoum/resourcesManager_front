import { Component, HostListener } from '@angular/core';
import { GestionPannesService } from '../../services/gestion-pannes.service';
import { Panne, PanneAction, Ressource } from 'src/app/classes/Classes';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  public Pannes!: Panne[];
  public Ressources!: Ressource[];
  public changerCount: number | undefined;
  public reparerCount: number | undefined;
  public panneActions: typeof PanneAction = PanneAction;

  constructor(private gestionPannesService: GestionPannesService) {}
  @HostListener('window:beforeunload')
  ngOnInit(): void {
    this.getPannes();
    this.getAllRessources();
    this.updateCounts();
  }

  public updateCounts(): void {
    if (this.Pannes && this.Ressources) {
      const changer = this.Pannes.filter(
        (panne) =>
          String(panne.demande) === 'CHANGER' &&
          this.getRessource(panne.idRessource).idFournisseur === '61b41a96-dd44-11ed-b5ea-0242ac120002' //extract from the current user
      );
      console.log(this.Pannes);
      this.changerCount = changer.length;

      const reparer = this.Pannes.filter(
        (panne) =>
          String(panne.demande) === 'REPARER' &&
          this.getRessource(panne.idRessource).idFournisseur === '61b41a96-dd44-11ed-b5ea-0242ac120002' //extract from the current user
      );
      this.reparerCount = reparer.length;
    }
  }

  public getPannes(): void {
    this.gestionPannesService.getPanneWithDemandeNotNull().subscribe({
      next: (data: Panne[]) => {
        this.Pannes = data;
        this.updateCounts();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  public getAllRessources(): void {
    this.gestionPannesService.getAllRessources().subscribe({
      next: (data: Ressource[]) => {
        this.Ressources = data;
        this.updateCounts();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  public getRessource(idRessource: number | null): Ressource {
    return this.Ressources.filter(
      (ressource) => ressource.id === idRessource
    )[0];
  }
}
