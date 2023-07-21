import { NotifFournisseur } from './../../classes/Classes';
import { Component } from '@angular/core';
import { Router, RouterEvent, Event } from '@angular/router';
import { filter } from 'rxjs';
import { Demande } from 'src/app/classes/Classes';
import { EventTypes } from 'src/app/classes/event-type';
import { AuthService } from 'src/app/services/auth.service';
import { GestionBesoinsService } from 'src/app/services/gestion-besoins.service';
import { OffreService } from 'src/app/services/offre.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-head-menu',
  templateUrl: './head-menu.component.html',
  styleUrls: ['./head-menu.component.css']
})
export class HeadMenuComponent {

  public demandesByIdMembre: Demande[] = [];
  public idMembreDepartement: string = "";
  public currentPath: string = "";
  public userName: string = "";
  public isLoggedIn!: boolean;
  public userId!: string;
  public userRole!: string[];
  public notifsFournisseur: NotifFournisseur[] = [];

  public constructor(private besoinsService: GestionBesoinsService, private router: Router,
    private auth: AuthService, private userStore: UserStoreService, private toastService: ToastService,
    private offreService: OffreService) { }

  ngOnInit(): void {
    this.userId = this.auth.getConnectedUserId();
    this.userStore.getFullName().subscribe(res => {
      let fullName = this.auth.getUserNameFromToken();
      this.userName = res || fullName;
    }
    );
    this.userStore.getRoles().subscribe(res => {
      let roles = JSON.parse(localStorage.getItem('roles')!);
      if (res.length != 0)
        this.userRole = res;
      else
        this.userRole = roles;
    });

    this.isLoggedIn = this.isLoginIn();

    this.loadDemandes()

    this.getCurrentPath();
    this.loadNotifFournisseur()
  }
  public hasRole(role: string[]): boolean {
    return this.userRole?.some(item => role.includes(item));
  }
  public loadDemandes() {
    this.idMembreDepartement = this.userId; //extract from the current Enseignant !!!
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
    this.besoinsService.demandeSeen(demande.id).subscribe({
      next: (data) => {
        this.loadDemandes()
      },
      error: (error) => console.log(error)
    })
  }
  onLogout() {
    this.auth.onLogout(localStorage.getItem('access-token')).subscribe({
      next: () => {
        localStorage.clear();
        this.router.navigate(['/login']);
        this.toastService.showInfoToast(EventTypes.Info, "Logout success");
      },
      error: (err) => {
        console.warn(err);
      }
    }
    );
  }
  isLoginIn(): boolean {
    return localStorage.getItem('access-token') !== null;
  }
  getNumberOfNotifications() {
    let numberOfNotif = 0;
    this.demandesByIdMembre.forEach((notif) => {
      if (!notif.isSeen)
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

  public loadNotifFournisseur() {
    this.offreService.getNotifFournisseur(this.userId).subscribe({
      next: (data) => this.notifsFournisseur = data,
      error: (error) => console.log(error)
    })
  }

  public getNumberOfNotificationsFour() {

    let numberOfNotif = 0;
    this.notifsFournisseur.forEach((notif) => {
      if (!notif.isSeen)
        numberOfNotif += 1;
    })
    return numberOfNotif;
  }

  public notifFourIsSeen(id: number | null) {
    this.offreService.notifSeen(id).subscribe({
      next: (data) => {this.loadNotifFournisseur()},
      error: (error) => console.log(error)
    })
  }

}
