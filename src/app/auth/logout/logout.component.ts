import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventTypes } from 'src/app/classes/event-type';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  constructor(private route: Router, private auth: AuthService, private toastService: ToastService) { }
  ngOnInit(): void {
    this.auth.onLogout(localStorage.getItem('access-token')).subscribe({
      next: () => {
        localStorage.clear();
        this.route.navigate(['/login']);
        this.toastService.showInfoToast(EventTypes.Info, "Logout success");
      },
      error: (err) => {
        console.warn(err);
      }
    }
    );

  }

}
