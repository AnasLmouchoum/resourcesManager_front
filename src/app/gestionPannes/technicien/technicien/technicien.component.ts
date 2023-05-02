import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Departement, Technicien } from 'src/app/classes/Classes';
import { GestionPannesService } from 'src/app/services/gestion-pannes.service';
declare var $: any;
@Component({
  selector: 'app-technicien',
  templateUrl: './technicien.component.html',
  styleUrls: ['./technicien.component.css'],
})
export class TechnicienComponent {
  public techniciens!: Technicien[];
  deleteTechnicien!: Technicien | undefined;
  editTechnicien!: Technicien | undefined;

  public nomInvalid = false;
  public prenomInvalid = false;
  public usernameInvalid = false;
  public passwordInvalid = false;
  public emailInvalid = false;
  public cinInvalid = false;
  public specialiteInvalid = false;

  public constructor(private gestionPannesService: GestionPannesService) { }

  ngOnInit(): void {
    this.loadTechnicien();
  }

  public loadTechnicien() {
    this.techniciens = [];
    this.getAllTechnicien();
  }

  public getAllTechnicien() {
    this.gestionPannesService.getAllTechniciens().subscribe({
      next: (data) => {
        this.techniciens = data;
      },
      error: (error) => console.log(error),
    });
  }

  public validateForm(form: NgForm) {
    if (form.value.nom == '') this.nomInvalid = true;
    else this.nomInvalid = false;
    if (form.value.prenom == '') this.prenomInvalid = true;
    else this.prenomInvalid = false;
    if (form.value.username == '') this.usernameInvalid = true;
    else this.usernameInvalid = false;
    if (form.value.password == '') this.passwordInvalid = true;
    else this.passwordInvalid = false;
    if (form.value.email == '') this.emailInvalid = true;
    else this.emailInvalid = false;
    if (form.value.cin == '') this.cinInvalid = true;
    else this.cinInvalid = false;
    if (form.value.specialite == '') this.specialiteInvalid = true;
    else this.specialiteInvalid = false;
    form.reset();
  }

  public handleAjouterTechnicien(addTechnicienForm: NgForm): void {
    if (addTechnicienForm.valid) {
      this.gestionPannesService
        .addTechnicien(addTechnicienForm.value)
        .subscribe({
          next: (data) => this.techniciens.push(data),
          error: (error) => console.log(error),
        });
      $('#addTechnicienModal').modal('hide');
    } else {
      this.validateForm(addTechnicienForm);
    }
  }

  public handleDeleteTechnicien() {
    console.log(this.deleteTechnicien);
    if (this.deleteTechnicien != undefined) {
      this.gestionPannesService
        .deleteTechnicien(this.deleteTechnicien!.id)
        .subscribe({
          next: () => {
            let index = this.techniciens.indexOf(this.deleteTechnicien!);
            this.techniciens.splice(index, 1);
          },
          error: (error) => console.log(error),
        });
      this.deleteTechnicien = undefined;
    }
  }

  public handleEditTechnicien(technicien: Technicien) {
    technicien.id = this.editTechnicien!.id;
    technicien.password = this.editTechnicien!.password;
    this.gestionPannesService.editTechnicien(technicien).subscribe({
      next: (data) => this.loadTechnicien(),
      error: (error) => console.log(error),
    });
  }

  public openModal(technicien: Technicien, mode: string): void {
    if (mode == 'editTechnicien') this.editTechnicien = technicien;
    else if (mode == 'deleteTechnicien') this.deleteTechnicien = technicien;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      $(document).ready(function () {
        $('#techniciensTable').DataTable();
      });
    }, 500);
  }
}
