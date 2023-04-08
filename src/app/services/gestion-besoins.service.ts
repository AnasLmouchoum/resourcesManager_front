import { Injectable } from '@angular/core';
import { Besoin, Imprimante, Ordinateur } from '../classes/Classes';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class GestionBesoinsService {

  private apiServerUrl: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public addBesoins(besoin: Besoin): Observable<Besoin> {
    return this.http.post<Besoin>(`${this.apiServerUrl}/besoins`, besoin);
  }

}
