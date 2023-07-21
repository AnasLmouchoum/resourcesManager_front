import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastService } from './toast.service';
import { EventTypes } from '../classes/event-type';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private toastService: ToastService, private router: Router, private auth: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('access-token');
    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }
    return next.handle(request).pipe(catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.toastService.showWarningToast(EventTypes.Warning, err.error?.message);
          this.router.navigate(['/login']);
        }
        else if (err.status === 403) {
          this.router.navigate(['/forbidden']);
        }
        else if (err.status === 500)
          this.router.navigate(['/server-error']);
        else
          this.toastService.showWarningToast(EventTypes.Warning, err.error?.message);
      }

      return throwError(() => new Error(err.error));
    }));
  }

}
