import { Injectable } from '@angular/core';
import { Imprimante, Ordinateur } from '../classes/Classes';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GestionBesoinsService {

  constructor(private http: HttpClient) { }

}
