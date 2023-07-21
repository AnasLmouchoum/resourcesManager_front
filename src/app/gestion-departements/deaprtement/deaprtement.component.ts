import { Component } from '@angular/core';
import { Departement } from 'src/app/classes/Classes';
import { GestionDepartementsService } from '../../services/gestion-departements.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AbstractControl, NgForm } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-deaprtement',
  templateUrl: './deaprtement.component.html',
  styleUrls: ['./deaprtement.component.css'],
})
export class DeaprtementComponent {
  public departements: Departement[] = [];
  public editDepartement: Departement | undefined;
  public deleteDepartement: Departement | undefined;
  public addDepartementForm!: NgForm;
  public editDepartementForm!: NgForm;

  constructor(private gestDepartementService: GestionDepartementsService) {}

  ngOnInit(): void {
    this.addDepartementForm = new NgForm([], []);
    this.editDepartementForm = new NgForm([], []);
    this.getDepartements();
  }

  public getDepartements(): void {
    this.gestDepartementService.getAllDepartements().subscribe({
      next: (departements: Departement[]) => {
        this.departements = departements;
        this.getDepartements();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  public handleAjouterDepartement(addDepartementForm: NgForm): void {
    this.addDepartementForm = addDepartementForm;
    this.addDepartementForm.form.controls['nomDepartement'].markAsTouched();
    
    if (this.addDepartementForm.invalid) return;
    this.gestDepartementService
      .addDepartement(addDepartementForm.value)
      .subscribe({
        next: (data) => {
          this.departements.push(data);
          addDepartementForm.reset();
          this.ngAfterViewInit();
        },
        error: (error) => {
          console.log(error);
          addDepartementForm.reset();
        },
      });
  }

  public handleEditDepartement(
    departement: Departement,
    editDepartementForm: NgForm
  ): void {
    this.editDepartementForm = editDepartementForm;
    this.editDepartementForm.form.controls['nomDepartement'].markAsTouched();
    if (this.editDepartementForm.invalid) return;
    departement.id = this.editDepartement!.id;
    departement.membreDepartements = this.editDepartement!.membreDepartements;
    this.gestDepartementService.editDepartement(departement).subscribe({
      next: (data) => {
        this.getDepartements();
        editDepartementForm.reset();
        this.ngAfterViewInit();
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.editDepartement = undefined;
  }

  public handleDeleteDepartement(): void {
    if (this.deleteDepartement != undefined) {
      this.gestDepartementService
        .deleteDepartement(this.deleteDepartement!.id)
        .subscribe({
          next: () => {
            let index = this.departements.indexOf(this.deleteDepartement!);
            this.departements.splice(index, 1);
            this.ngAfterViewInit();
          },
          error: (error) => console.log(error),
        });
      this.deleteDepartement = undefined;
    }
  }

  public openModal(departement: Departement, mode: string): void {
    if (mode == 'editDepartement') this.editDepartement = departement;
    else if (mode == 'deleteDepartement') this.deleteDepartement = departement;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      $(document).ready(function () {
        $('#departementsTable').DataTable();
      });
    }, 500);
  }
}
