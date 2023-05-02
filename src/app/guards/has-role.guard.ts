import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { EventTypes } from '../classes/event-type';
import { AuthService } from '../services/auth.service';
import { UserStoreService } from '../services/user-store.service';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard {
  constructor(private toastService: ToastService, private auth: AuthService, private userStore: UserStoreService) {
  }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    let hasRole!: boolean;
    let roles!: string[];
    this.userStore.getRoles().subscribe(res => {
      if (res.length != 0)
        roles = res;
      else
        roles = JSON.parse(localStorage.getItem('roles')!);
    });
    if (roles.some(item => route.data['role'].includes(item))) {
      hasRole = true;
    }
    else {
      this.toastService.showWarningToast(EventTypes.Warning, "Unauthorized access");
      hasRole = false;
    }
    return hasRole;
  }


}
