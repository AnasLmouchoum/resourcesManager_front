import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Departement, MembreDepartement, Role } from 'src/app/classes/Classes';
import { GestionDepartementsService } from 'src/app/services/gestion-departements.service';
declare var $: any;

@Component({
  selector: 'app-membre',
  templateUrl: './membre.component.html',
  styleUrls: ['./membre.component.css']
})
export class MembreComponent {


  public membresDepartement!: MembreDepartement[];
  deleteMembre!: MembreDepartement | undefined;
  editMembre!: MembreDepartement | undefined;
  public departements!: Departement[];

  public constructor(private gestionDepartementsService: GestionDepartementsService) {}

  ngOnInit(): void {
    this.loadMembresDepartement();
    this.loadDepartements();
  }

  public loadMembresDepartement() {
    this.membresDepartement = []
    this.getAllMembresDepartement();
  }

  public loadDepartements() {
    this.departements = [];
    this.getDepartements();
  }

  public getAllMembresDepartement() {
    this.gestionDepartementsService.getAllMembers().subscribe({
      next: (data) => {
        this.membresDepartement = data
      },
      error: (error) => console.log(error)
    })
  }

  public handleAjouterMembre(addMembreForm: NgForm): void {
    let role: Role = {
      nomRole: addMembreForm.value.roles,
      id: null,
    }
    addMembreForm.value.roles = [role]
    this.gestionDepartementsService.addMembre(addMembreForm.value).subscribe({
      next: (data) => this.membresDepartement.push(data),
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

  public handleDeleteMembre() {
    console.log(this.deleteMembre)
    if(this.deleteMembre != undefined) {
      this.gestionDepartementsService.deleteMembre(this.deleteMembre!.id).subscribe({
        next: () => {
          let index = this.membresDepartement.indexOf(this.deleteMembre!);
          this.membresDepartement.splice(index, 1);
        },
        error: (error) => console.log(error)
      });
      this.deleteMembre = undefined;
    }
  }

  public handleEditMembre(membre: MembreDepartement) {
    membre.id = this.editMembre!.id;
    membre.roles = this.editMembre!.roles;
    membre.password = this.editMembre!.password;
    this.gestionDepartementsService.editMembre(membre).subscribe({
      next: (data) => this.loadMembresDepartement(),
      error: (error) => console.log(error)
    })
  }


  public getDepartement(idDepartement: number): string {
    return this.departements.filter((dep) => dep.id == idDepartement)[0].nomDepartement
  }

  public getRoles(roles: Role[]): string {
    let rolesString: string = "";
    roles.forEach(role => {
      switch (role.nomRole) {
        case "PROF":
          rolesString += "Enseignant - "
          break;
        case "CHEF_DEP":
          rolesString += "Chef Departement - "
          break;
        default:
          break;
      }
    });
    return rolesString.slice(0, -2)
  }

  public openModal(membre: MembreDepartement, mode: string): void {
    if(mode == "editMembre")
      this.editMembre = membre;
    else if(mode == "deleteMembre")
      this.deleteMembre = membre;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      $(document).ready(function() {
        $('#membresTable').DataTable();
      });
    }, 500);
  }

}
