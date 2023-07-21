import { Component, HostListener } from '@angular/core';
import { GestionPannesService } from '../../services/gestion-pannes.service';
import { Panne, PanneAction, Ressource } from 'src/app/classes/Classes';
import { HttpErrorResponse } from '@angular/common/http';
import { UserStoreService } from 'src/app/services/user-store.service';

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
  public userId!: string;
  public idDepartement!: number;
  public userRole!: string[];
  constructor(private gestionPannesService: GestionPannesService, private userStore: UserStoreService) { }
  @HostListener('window:beforeunload')
  ngOnInit(): void {
    this.userStore.getRoles().subscribe(res => {
      let roles = JSON.parse(localStorage.getItem('roles')!);
      if (res.length != 0)
        this.userRole = res;
      else
        this.userRole = roles;
    });

    this.getPannes();
    this.getAllRessources();
    this.updateCounts();
    this.userId = localStorage.getItem('userId')!;
    this.idDepartement = Number(localStorage.getItem('departementId')!);
  }


  public hasRole(role: string[]): boolean {
    return this.userRole?.some(item => role.includes(item));
  }

  public updateCounts(): void {
    if (this.Pannes && this.Ressources) {
      const changer = this.Pannes.filter(
        (panne) =>
          String(panne.demande) === 'CHANGER' &&
          this.getRessource(panne.idRessource).idFournisseur === this.userId //extract from the current user
      );
      this.changerCount = changer.length;

      const reparer = this.Pannes.filter(
        (panne) =>
          String(panne.demande) === 'REPARER' &&
          this.getRessource(panne.idRessource).idFournisseur === this.userId //extract from the current user
      );
      this.reparerCount = reparer.length;
    }
  }
  public getRoles(): boolean {

    return true;
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
