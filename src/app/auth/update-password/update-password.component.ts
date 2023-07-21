import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PasswordDTO} from "../../classes/PasswordDTO.interface";
import {ToastService} from "../../services/toast.service";
import {EventTypes} from "../../classes/event-type";

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent {
  resetForm!: FormGroup;
  token!: string | null;

  constructor(private fb: FormBuilder, private auth: AuthService, private activatedRoute: ActivatedRoute,
              private route: Router, private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  updatePassword() {
    const token = this.activatedRoute.snapshot.queryParamMap.get('token');
    if (!token) return;
    let passwordDTO: PasswordDTO = {
      newPassword: this.resetForm.get('password')?.value,
      email: this.resetForm.get('email')?.value,
      token: token
    }
    this.auth.validateResetPassword(token).subscribe(
      {
        next: () => {
          this.auth.updatePassword(passwordDTO).subscribe({
            next: () => {
              this.route.navigate(['/login']);
              this.toastService.showSuccessToast(EventTypes.Success, "your password has been updated");
            }
          })
        }
      }
    )
  }
}
