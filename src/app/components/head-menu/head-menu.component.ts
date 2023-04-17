import { Component } from '@angular/core';
import { Router, RouterEvent, Event } from '@angular/router';
import { filter } from 'rxjs';
import { Demande } from 'src/app/classes/Classes';
import { GestionBesoinsService } from 'src/app/services/gestion-besoins.service';

@Component({
  selector: 'app-head-menu',
  templateUrl: './head-menu.component.html',
  styleUrls: ['./head-menu.component.css']
})
export class HeadMenuComponent {

  public demandesByIdMembre: Demande[] = [];
  public idMembreDepartement: string = "";
  public currentPath: string = "";

  public constructor(private besoinsService: GestionBesoinsService, private router: Router) {}

  ngOnInit(): void {
    this.loadDemandes()
    //get Current path
    this.getCurrentPath();
  }

  public loadDemandes() {
    this.idMembreDepartement = "ac068373-69ce-4d7d-84dd-ca89419588e9"; //extract from the current Enseignant !!!
    this.getDemandesByIdMembre(this.idMembreDepartement)
  }

  public getDemandesByIdMembre(idMembre: string) {
    this.besoinsService.getDemandesByIdMembre(idMembre).subscribe({
      next: (data) => {
        this.demandesByIdMembre = data.reverse()
      },
      error: (error) => console.log(error)
    })
  }

  public notifIsSeen(demande: Demande) {
    console.log("ssen")
    this.besoinsService.demandeSeen(demande.id).subscribe({
      next: (data) => {
        this.loadDemandes()
      },
      error: (error) => console.log(error)
    })
  }

  getNumberOfNotifications() {
    let numberOfNotif = 0;
    this.demandesByIdMembre.forEach((notif) => {
      if(!notif.isSeen)
        numberOfNotif += 1;
    })
    return numberOfNotif;
  }

  getCurrentPath() {
    this.router.events.pipe(
      filter((e: Event): e is RouterEvent => e instanceof RouterEvent)
    ).subscribe((e: RouterEvent) => {
      this.currentPath = e.url
    });
  }

}
