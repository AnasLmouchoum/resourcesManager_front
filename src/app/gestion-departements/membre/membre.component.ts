import { Component } from '@angular/core';
import {
  EmailValidator,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Departement, MembreDepartement, Role } from 'src/app/classes/Classes';
import { GestionDepartementsService } from 'src/app/services/gestion-departements.service';
declare var $: any;

@Component({
  selector: 'app-membre',
  templateUrl: './membre.component.html',
  styleUrls: ['./membre.component.css'],
})
export class MembreComponent {
  public membresDepartement: MembreDepartement[] = [];
  deleteMembre!: MembreDepartement | undefined;
  editMembre!: MembreDepartement | undefined;
  public departements: Departement[] = [];
  addMembreForm!: FormGroup;
  editFormFoup!: FormGroup;
  public constructor(
    private gestionDepartementsService: GestionDepartementsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.addMembreForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      roles: ['', Validators.required],
      idDepartement: ['', Validators.required],
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
    });
    this.editFormFoup = new FormGroup({
      nom: new FormControl(this.editMembre?.nom, Validators.required),
      
    });

    this.getAllMembresDepartement();
    this.getDepartements();
  }

  public getAllMembresDepartement() {
    this.gestionDepartementsService.getAllMembers().subscribe({
      next: (data) => {
        this.membresDepartement = data;
      },
      error: (error) => console.log(error),
    });
  }

  public handleAjouterMembre(): void {
    let role: Role = {
      nomRole: this.addMembreForm.value.roles,
      id: null,
    };
    this.addMembreForm.value.roles = [role];
    if (!this.addMembreForm.valid) {
      this.validateAllFormsFields(this.addMembreForm);
    } else {
      this.gestionDepartementsService
        .addMembre(this.addMembreForm.value)
        .subscribe({
          next: (response: MembreDepartement) => {
            this.getAllMembresDepartement();
            this.addMembreForm.reset();
          },
          error: (error) => console.log(error),
        });
    }
  }

  public getDepartements(): void {
    this.gestionDepartementsService.getAllDepartements().subscribe({
      next: (data: Departement[]) => {
        this.departements = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public handleDeleteMembre(membre: MembreDepartement | undefined) {
    if (membre) {
      this.gestionDepartementsService.deleteMembre(membre.id).subscribe({
        next: () => {
          this.getAllMembresDepartement();
        },
        error: (error) => console.log(error),
      });
    }
  }

  public handleEditMembre(membre: MembreDepartement) {
    const updatedMembre = { ...this.editMembre, ...membre };

    console.warn(updatedMembre);
    // this.gestionDepartementsService.editMembre(updatedMembre).subscribe({
    //   next: () => {
    //     this.getAllMembresDepartement();
    //   },
    //   error: (error) => console.log(error),
    // });
  }

  public getDepartement(idDepartement: number): string | undefined {
    return this.departements.find((dep) => dep.id == idDepartement)
      ?.nomDepartement;
  }

  public getRoles(roles: Role[]): string {
    let rolesString: string = '';
    roles.forEach((role) => {
      switch (role.nomRole) {
        case 'PROF':
          rolesString += 'Enseignant - ';
          break;
        case 'CHEF_DEP':
          rolesString += 'Chef Departement - ';
          break;
        default:
          break;
      }
    });
    return rolesString.slice(0, -2);
  }

  public openModal(membre: MembreDepartement | undefined, mode: string): void {
    if (mode == 'editMembre') {
      this.editMembre = membre;
      console.warn(this.editMembre);
    } else if (mode == 'deleteMembre') this.deleteMembre = membre;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      $(document).ready(function () {
        $('#membresTable').DataTable();
      });
    }, 500);
  }

  private validateAllFormsFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormsFields(control);
      }
    });
  }
}
