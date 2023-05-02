import { Component, OnInit } from '@angular/core';
import { Event, RouterEvent, Router } from '@angular/router'
import { filter } from 'rxjs';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'res_manager_front';
  currentRoute!: any;
  constructor(public router: Router, private auth: AuthService) { }
  ngOnInit(): void {
    this.router.events.pipe(
      filter((e: Event): e is RouterEvent => e instanceof RouterEvent)
    ).subscribe((e: RouterEvent) => {
      this.currentRoute = e.url
      console.log(this.currentRoute);

    });
  }

}