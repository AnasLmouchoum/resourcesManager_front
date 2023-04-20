import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Besoin, AppelOffre } from '../classes/Classes';
@Injectable({
  providedIn: 'root'
})
export class GestionAppelOffreService {

  private apiServerUrl: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAllAppelOffre():Observable<AppelOffre[]>{

    return this.http.get<AppelOffre[]>(`${this.apiServerUrl}/appelOffre`);

  }

  public getAppelOffre(idAppelOffre:number):Observable<AppelOffre>{
    return this.http.get<AppelOffre>(`${this.apiServerUrl}/appelOffre/${idAppelOffre}`);
  }

  public blackListFournisseur(id: string|null|undefined, motif: string): Observable<void> {
    return this.http.post<void>(`${this.apiServerUrl}/fournisseurs/blackList/${id}`, motif)
  }

  public creerAppelOffre(appelOffre:AppelOffre):Observable<AppelOffre>{

     return this.http.post<AppelOffre>(`${this.apiServerUrl}/appelOffre/creer`, appelOffre);
  }


  public publierAppelOffre(idAppelOffre: number): Observable<void> {
    let id=idAppelOffre
    console.log("i am in publier service"+  idAppelOffre +typeof idAppelOffre);
    return this.http.put<void>(`${this.apiServerUrl}/appelOffre/publier/${id}`, null);

  }


  public deleteAppelOffre(idAppelOffre:number|null):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/appelOffre/${idAppelOffre}`);
 }





}
