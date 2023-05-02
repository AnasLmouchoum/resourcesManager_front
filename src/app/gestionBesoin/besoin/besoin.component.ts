import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Besoin, Imprimante, Ordinateur } from 'src/app/classes/Classes';
import { AuthService } from 'src/app/services/auth.service';
import { GestionBesoinsService } from 'src/app/services/gestion-besoins.service';

@Component({
  selector: 'app-besoin',
  templateUrl: './besoin.component.html',
  styleUrls: ['./besoin.component.css']
})
export class BesoinComponent {

  ordinateursBesoin: Ordinateur[] = [];
  imprimantesBesoin: Imprimante[] = [];
  typeBesoinToAdd: string = "";
  openAddBesoin: boolean = false;
  isForDepartement: boolean = false;
  userId!: string;
  idDepartement!: number;
  public constructor(private gestionBesoinService: GestionBesoinsService, private auth: AuthService) {

  }

  ngOnInit(): void {
    this.getAllOrdinateursBesoin();
    this.getAllImprimantesBesoin();
    this.userId = localStorage.getItem('userId')!;
    this.idDepartement = Number(localStorage.getItem('departementId')!);
    
  }
  public hasRole(role: string[]): boolean {
    return this.auth.getRolesFromToken().some(item => role.includes(item));
  }
  public handleSaveBesoins() {

    let formattedDate = this.formateDate(new Date())
    let besoin: Besoin = {
      id: null,
      dateDemande: formattedDate,
      dateAffectation: null,
      isAffected: false,
      idMembreDepartement: this.userId, // extract idMembreDepartement from current user
      idDepartement: this.idDepartement, // extract idDepartement from current user
      isBesoinInAppelOffre: false,
      ordinateurs: this.ordinateursBesoin,
      imprimantes: this.imprimantesBesoin
    };
    if (this.isForDepartement == false) {
      besoin.idMembreDepartement = this.userId; // extract idMembreDepartement from current user
    }
    this.gestionBesoinService.addBesoins(besoin).subscribe({
      next: (data) => { this.reset() },
      error: (error) => console.log(error)
    })
  }

  public onCheckboxChange() {
    this.isForDepartement = !this.isForDepartement;
  }

  public handleCloseAddBesoin() {
    this.openAddBesoin = false;
    this.typeBesoinToAdd = "";
    this.resetTypeToAdd();
  }

  reset() {
    this.handleCloseAddBesoin();
    this.ordinateursBesoin = [];
    this.imprimantesBesoin = [];
    localStorage.removeItem('ordinateursBesoin');
    localStorage.removeItem('imprimtantsBesoin');
  }

  public handleAddRessourceToBesoin(ressourceToAdd: NgForm) {
    if (this.isForDepartement == true) {
      if (this.typeBesoinToAdd == 'Ordinateur') {
        var ordinateur = {} as Ordinateur;
        ordinateur.type = this.typeBesoinToAdd;
        ordinateur.cpu = ressourceToAdd.value.cpu;
        ordinateur.ram = ressourceToAdd.value.ram;
        ordinateur.disqueDur = ressourceToAdd.value.disquedur;
        ordinateur.ecran = ressourceToAdd.value.ecran;
        ordinateur.idDepartement = this.idDepartement; // extract idDepartement from current user
        this.ordinateursBesoin.push(ordinateur);
        this.addOrdinateurToLocalStorage();
      } else if (this.typeBesoinToAdd == 'Imprimante') {
        var imprimante = {} as Imprimante;
        imprimante.type = this.typeBesoinToAdd;
        imprimante.resolution = ressourceToAdd.value.resolution;
        imprimante.vitesseImpression = ressourceToAdd.value.vitesseimpression;
        imprimante.idDepartement = this.idDepartement; // extract idDepartement from current user
        this.imprimantesBesoin.push(imprimante);
        this.addImprimanteToLocalStorage();
      }
    } else {
      if (this.typeBesoinToAdd == 'Ordinateur') {
        var ordinateur = {} as Ordinateur;
        ordinateur.type = this.typeBesoinToAdd;
        ordinateur.cpu = ressourceToAdd.value.cpu;
        ordinateur.ram = ressourceToAdd.value.ram;
        ordinateur.disqueDur = ressourceToAdd.value.disquedur;
        ordinateur.ecran = ressourceToAdd.value.ecran;
        ordinateur.idDepartement = this.idDepartement; // extract idDepartement from current user
        ordinateur.idMembreDepartement = this.userId;// extract idMembreDepartement from current user
        this.ordinateursBesoin.push(ordinateur);
        this.addOrdinateurToLocalStorage();
      } else if (this.typeBesoinToAdd == 'Imprimante') {
        var imprimante = {} as Imprimante;
        imprimante.type = this.typeBesoinToAdd;
        imprimante.resolution = ressourceToAdd.value.resolution;
        imprimante.vitesseImpression = ressourceToAdd.value.vitesseimpression;
        imprimante.idDepartement = Number(localStorage.getItem('departementId'));
        imprimante.idMembreDepartement = localStorage.getItem('userId');
        this.imprimantesBesoin.push(imprimante);
        this.addImprimanteToLocalStorage();
      }
    }
    this.resetTypeToAdd();
    this.openAddBesoin = false;
  }

  addOrdinateurToLocalStorage() {
    let ordinateursLocal = "";
    this.ordinateursBesoin.forEach(ord => {
      ordinateursLocal += JSON.stringify(ord) + ";"
    });
    localStorage.setItem('ordinateursBesoin', ordinateursLocal)
  }

  addImprimanteToLocalStorage() {
    let imprimanteLocal = "";
    this.imprimantesBesoin.forEach(imp => {
      imprimanteLocal += JSON.stringify(imp) + ";"
    });
    localStorage.setItem('imprimtantsBesoin', imprimanteLocal)
  }

  public chooseRessource(typeSelected: any) {
    this.typeBesoinToAdd = typeSelected.target.value;
  }

  public resetTypeToAdd() {
    this.typeBesoinToAdd = "";
  }

  public getAllOrdinateursBesoin() {
    let ordinateursLocal = localStorage.getItem('ordinateursBesoin');
    let ordinateursBesoin = ordinateursLocal?.split(";")
    ordinateursBesoin?.forEach(ord => {
      if (ord != "")
        this.ordinateursBesoin?.push(JSON.parse(ord))
    });
  }

  public getAllImprimantesBesoin() {
    let imprimanteLocal = localStorage.getItem('imprimtantsBesoin');
    let imprimtantesBesoin = imprimanteLocal?.split(";")
    imprimtantesBesoin?.forEach(imp => {
      if (imp != "")
        this.imprimantesBesoin?.push(JSON.parse(imp))
    });
  }

  public handleRemoveBesoin(type: string, obj: Ordinateur | Imprimante) {
    if (type == "Ordinateur") { //@ts-ignore
      let index = this.ordinateursBesoin.indexOf(obj);
      this.ordinateursBesoin.splice(index, 1);
      this.addOrdinateurToLocalStorage();
    } else if (type == "Imprimante") { //@ts-ignore
      let index = this.imprimantesBesoin.indexOf(obj);
      this.imprimantesBesoin.splice(index, 1);
      this.addImprimanteToLocalStorage();
    }
  }

  public formateDate(date: Date) {
    let today = date;
    let year = today.getFullYear();
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let day = String(today.getDate()).padStart(2, '0');
    let formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

}
