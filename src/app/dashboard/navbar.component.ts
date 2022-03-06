import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  template: `
    <mat-sidenav-container class="side-nav">
        <mat-sidenav opened mode="side" class="navigation">
          <mat-nav-list class="d-flex flex-column justify-content-between lista-link">
            <div>
              <a mat-list-item (click)="goFilm()">Film</a>
              <a mat-list-item (click)="goProfilo()">Profilo</a>
            </div>
            <a mat-list-item (click)="onLogout()" class="mb-5">Esci</a>
          </mat-nav-list>
        </mat-sidenav>
        <mat-sidenav-content>
          <main class="m-5">
            <router-outlet></router-outlet>
          </main>
        </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
  /* main{
    height:80vh;
  } */
  .side-nav{
    height:100%
  }
  .navigation{
    width:10%
  }
  .lista-link{
    height:100%;
  }
  `
  ]
})
export class NavbarComponent implements OnInit {

  constructor(private route : ActivatedRoute,private router: Router, private authSrv: AuthService) { }

  ngOnInit(): void {
  }

  goFilm(){
    this.router.navigate(['film'], {relativeTo:this.route});
  }

  goProfilo(){
    this.router.navigate(['profilo'], {relativeTo:this.route})
  }

  onLogout(){
    this.authSrv.logout()
  }

}
