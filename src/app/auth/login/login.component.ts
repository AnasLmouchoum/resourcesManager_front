import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { EventTypes } from 'src/app/classes/event-type';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserStoreService } from 'src/app/services/user-store.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin!: boolean;
  isText: boolean = false;
  type: string = "password";
  eyeIcon: string = "bi-eye-slash";
  loginForm!: FormGroup;
  departementId!: any;
  userId!: any;
  constructor(
    private authService: AuthService, private router: Router, private fb: FormBuilder,
    private toastService: ToastService, private userStore: UserStoreService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  hideShowPassword() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "bi-eye" : this.eyeIcon = "bi-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
  onLogin() {

    if (this.loginForm.valid) {
      console.log(this.loginForm);
      this.authService.authenticateUser(this.loginForm.value).subscribe({
        next: (res) => {
          this.authService.setTokens(res.accessToken, res.refreshToken);
          const payload = this.authService.decodedToken();
          this.userStore.setFullName(payload!.sub);
          let roles: any[] = payload!.ROLES.map((role: { authority: any; }) => role.authority);
          this.userStore.setRoles(roles);
          this.authService.setRolesFromToken(roles);
          this.userId = payload!.userId;
          this.authService.setConnectedUserId(this.userId);
          this.loginForm.reset();
          this.router.navigate(['/home']);
          this.toastService.showSuccessToast(EventTypes.Success, "login successfuly");
          this.authService.getDepartementIdByUserId(this.userId).subscribe({
            next: (res) => {
              this.authService.setDepartementId(res)
            }

          });
        },
        error: () => {
        }
      });
    } else {
      this.validateAllFormsFields(this.loginForm);
    }

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