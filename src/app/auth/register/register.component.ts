import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { EventTypes } from 'src/app/classes/event-type';
import { Fournisseur, Technicien } from 'src/app/classes/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isText: boolean = false;
  type: string = "password";
  eyeIcon: string = "bi-eye-slash"
  errorMessage!: string;
  invalidRegister!: boolean;
  selectedRole!: string;
  registerForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastService: ToastService
  ) { }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      addresse: ['', Validators.required],
      nomSociete: ['', Validators.required],
    });
  }
  hideShowPassword() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "bi-eye" : this.eyeIcon = "bi-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
  onRegister() {
    if (this.registerForm.valid) {

      this.saveFournisseur();
    }
    else {
      this.validateAllFormsFields(this.registerForm);
    }
  }
  private saveFournisseur() {
    const fournisseur = this.createFournisseur();
    console.log(fournisseur);
    this.auth.registerFournisseur(fournisseur).subscribe({
      next: () => {
        this.toastService.showSuccessToast(EventTypes.Success, "Register successfuly");
        this.registerForm.reset();
        this.router.navigate(['login']);
      },
      error: () => {
      }
    });
  }

  private createFournisseur(): Fournisseur {
    const username = this.registerForm.get('userName')?.value;
    const password = this.registerForm.get('password')?.value;
    const addresse = this.registerForm.get('addresse')?.value;
    const nomSociete = this.registerForm.get('nomSociete')?.value;

    return { username, password, addresse, nomSociete };
  }


  private validateAllFormsFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormsFields(control)
      }
    })
  }

}
