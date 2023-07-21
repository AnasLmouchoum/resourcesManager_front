import { Component } from '@angular/core';
import { EventTypes } from 'src/app/classes/event-type';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  email!: string;
  constructor(private auth: AuthService, private toastService: ToastService) {}
  resetPassword() {
    this.auth.resetPassword(this.email).subscribe({
      next: () => {
        this.toastService.showSuccessToast(
          EventTypes.Success,
          'a reset link has been sent to your email'
        );

      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
