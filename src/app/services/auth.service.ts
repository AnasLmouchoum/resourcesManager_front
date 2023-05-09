import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User, Fournisseur } from '../classes/user.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = "http://localhost:8080/api/v1/users";
  private userPayload: any;
  constructor(private http: HttpClient) {
    this.userPayload = this.decodedToken();
  }

  registerFournisseur(fournisseur: Fournisseur): Observable<Fournisseur> {
    return this.http.post<Fournisseur>(`${this.apiUrl}/register`, fournisseur);
  }

  authenticateUser(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/authenticate`, user);
  }
  refreshToken() {
    return this.http.post(`${this.apiUrl}/refreshToken`, null);
  }

  setTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem('access-token', accessToken);
    localStorage.setItem('refresh-token', refreshToken);
  }

  getTokens(): any[] {
    return [
      localStorage.getItem('access-token'),
      localStorage.getItem('refresh-token')
    ];
  }
  getAccessToken(): any {
    return localStorage.getItem('access-token');
  }
  getRefreshToken(): any {
    return localStorage.getItem('refresh-token')
  }
  onLogout(token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/logout`, { headers: headers });
  }
  isLoggedIn() {
    return localStorage.getItem('access-token');
  }
  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getAccessToken();
    return jwtHelper.decodeToken(token);
  }
  getUserNameFromToken() {
    if (this.userPayload) {
      return this.userPayload.sub;
    }
  }
  getRolesFromToken(): string[] {
    return this.userPayload.ROLES.map((role: { authority: string }) => role.authority);
  }
  getConnectedUserId(): string {
    return `${localStorage.getItem('userId')!}`;
  }
  setRolesFromToken(roles: string[]) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }
  setConnectedUserId(userId: string) {
    localStorage.setItem('userId', userId);
  }
  getDepartementIdByUserId(userId: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`).pipe(
      map((response: any) => response.idDepartement)
    );
  }
  setDepartementId(departementId: string) {
    localStorage.setItem('departementId', JSON.stringify(departementId));
  }
}
