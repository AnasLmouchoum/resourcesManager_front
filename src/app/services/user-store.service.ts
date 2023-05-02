import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  public fullName$ = new BehaviorSubject<string>('');
 
  public roles$ = new BehaviorSubject<string[]>([]);
  public role$ = new BehaviorSubject<string>('');
  
  constructor() {}

  public getRole() {
    return this.role$.asObservable();
  }
  public setRole(role: string) {
    this.role$.next(role);
  }

  public setRoles(roles: string[]) {
    this.roles$.next(roles);
  }
  public getRoles() {
    return this.roles$.asObservable();
  }

  public getFullName() {
    return this.fullName$.asObservable();
  }
  public setFullName(name: string) {
    this.fullName$.next(name);
  }


}