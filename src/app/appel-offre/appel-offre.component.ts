import { Component } from '@angular/core';
import { AppelOffre, Besoin, Departement, Imprimante, MembreDepartement, Offre, Ordinateur, RessourceFournisseur } from '../classes/Classes';
import { GestionAppelOffreService } from '../services/gestion-appel-offre.service';
import { GestionBesoinsService, } from '../services/gestion-besoins.service';
import { GestionDepartementsService, } from '../services/gestion-departements.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { OffreService } from '../services/offre.service';
import { AuthService } from '../services/auth.service';
declare var $: any;

@Component({
  selector: 'app-appel-offre',
  templateUrl: './appel-offre.component.html',
  styleUrls: ['./appel-offre.component.css']
})
export class AppelOffreComponent {

  public appelsOffre: AppelOffre[] = [];
  public besoinsNotInAppelOffre: Besoin[] = [];
  public selectedBesoin: Besoin | undefined;
  public deletedAppelOffre!: AppelOffre | null;
  public offresOfAppel!: Offre[];
  public selecedtOffre: Offre | undefined;
  public departements: Departement[] = [];
  public membresDep: MembreDepartement[] = [];
  public blackListOpened: boolean = false;


  constructor(private appelOffreService: GestionAppelOffreService, private besoinService: GestionBesoinsService, private offreService: OffreService, private gestionDepartementsService: GestionDepartementsService, private auth: AuthService) { }

  ngOnInit(): void {


    this.loadAppelsOffre();
    this.loadBesoinsNotInAppelOffre();
    this.getDepartements();
    this.getAllMembresDepartement();


  }
  public hasRole(role: string[]): boolean {
    return this.auth.getRolesFromToken().some(item => role.includes(item));
  }
  loadAppelsOffre() {
    this.appelsOffre = [];
    this.getAppelsOffre();
  }


  public getDepartements(): void {
    this.gestionDepartementsService.getAllDepartements().subscribe({
      next: (data: Departement[]) => {
        this.departements = data;
        this.ngAfterViewInit();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    })
  }

  public getAllMembresDepartement() {
    this.gestionDepartementsService.getAllMembers().subscribe({
      next: (data) => {
        this.membresDep = data
      },
      error: (error) => console.log(error)
    })
  }


  public getMembreDepartement(idMembre: string | null | undefined): MembreDepartement | undefined {
    return this.membresDep.filter((mem) => mem.id == idMembre)[0]
  }

  public blackListFournisseur(motif: string) {
    this.blackListOpened = false;
    let idFournisseur = this.selecedtOffre?.idFournisseur
    this.appelOffreService.blackListFournisseur(idFournisseur, motif).subscribe({
      next: () => { console.log("Banned") },
      error: (error) => console.log(error)
    })
  }

  loadBesoinsNotInAppelOffre(): void {
    this.besoinService.getBesoinsNotInAppelOffre().subscribe({
      next: (data: Besoin[]) => {
        this.besoinsNotInAppelOffre = data;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    })

  }

  getDatePubAppelOffre(appelOffre: AppelOffre): string | null | Date {
    return appelOffre.datePub;
  }
  getAppelsOffre(): void {
    this.appelOffreService.getAllAppelOffre().subscribe({
      next: (data: AppelOffre[]) => {
        this.appelsOffre = data;
        this.ngAfterViewInit();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    })
  }
  ngAfterViewInit(): void {


    setTimeout(() => {
      $(document).ready(function () {
        $('#appelsOffreTable').DataTable();
      });
    }, 500);
  }


  handleCreerOffre(): void {
    this.loadBesoinsNotInAppelOffre();
    if (this.besoinsNotInAppelOffre.length != 0) {

      let appelOffreNow: AppelOffre = {
        id: null,
        datePub: null,
        isAffected: false,
        besoins: this.besoinsNotInAppelOffre
      }

      this.appelOffreService.creerAppelOffre(appelOffreNow).subscribe({
        next: (data: AppelOffre) => {
          this.appelsOffre.push(data);
          this.besoinsNotInAppelOffre = [];

        },

        error: (error: HttpErrorResponse) => {
          console.log(error);
        }


      })


    }


  }

  handleAnnulerAppelOffre(appelOffre: AppelOffre | null): void {
    if (appelOffre?.id) {
      console.log(appelOffre.id);

      this.appelOffreService.deleteAppelOffre(appelOffre.id).subscribe({
        next: () => {
          let index = this.appelsOffre.findIndex(a => a.id === appelOffre.id);
          this.appelsOffre.splice(index)
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      });

    }
    this.deletedAppelOffre = null;
  }

  handlePublierAppelOffre(appelOffre: AppelOffre): void {
    this.appelOffreService.publierAppelOffre(appelOffre.id!).subscribe({
      next: () => {

      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });

    this.appelsOffre.forEach(a => {
      if (a.id == appelOffre.id) { a.datePub = new Date().toLocaleString() }
    });
    this.loadAppelsOffre();

  }

  getOffreOfAppel(appelOffre: AppelOffre) {

    this.offreService.getOffreByAppelOffre(appelOffre).subscribe({


      next: (data: Offre[]) => {
        this.offresOfAppel = data;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);

      }
    })
  }



  public selectBesoin(besoin: Besoin): void {

    this.selectedBesoin = besoin;

  }
  public selectOffre(offre: Offre): void {
    this.selecedtOffre = offre;
  }

  deleteModal(appelOffre: AppelOffre): void {
    this.deletedAppelOffre = appelOffre;
  }

  public getOrdinateurs(): Ordinateur[] {

    return this.selectedBesoin?.ordinateurs || [];
  }

  public getImprimantes(): Imprimante[] {

    return this.selectedBesoin?.imprimantes || [];
  }


  public accepterOffre(offre: Offre | undefined): void {
    this.offreService.accepterOffre(offre).subscribe({
      next: () => {

      },
      error: (error: HttpErrorResponse) => {
        console.log(error);

      }

    })
  }
}
