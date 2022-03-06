import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MainService } from '../main.service';

@Component({
  template: `
      <div class="d-flex flex-wrap">
        <mat-card class="example-card m-2" *ngFor="let item of arrMovies">
          <mat-card-header>
            <div mat-card-avatar class="example-header-image"></div>
            <mat-card-title>{{item.title}}</mat-card-title>
          </mat-card-header>
          <img mat-card-image src="{{url+item.poster_path}}">
          <mat-card-actions>
            <div class="d-flex justify-content-between" *ngIf="favorites;">
             <button mat-icon-button
              [ngClass]="{'text-danger' : preferito, 'text-secondary': !preferito}"
              (click)="verificaPreferiti(item.id)">
              <mat-icon>favorite</mat-icon></button>
              <p class="align-self-center mt-3">Aggiungi ai preferiti</p>
            </div>
          </mat-card-actions>
        </mat-card>
      </div>
  `,
  styles: [`
  .example-card {
  max-width: 300px;
}`
  ]
})
export class FilmPage implements OnInit {
  arrMovies: Movie[] = []
  url:string = 'http://image.tmdb.org/t/p/w500'
  user!: any
  favorites!:any
  preferito!:boolean
  constructor(private mainSrv: MainService) {}

  async ngOnInit() {
    this.user =  await this.mainSrv.getUtente()?.toPromise()
    this.arrMovies = await this.mainSrv.getMovie().toPromise()
    this.trovaPreferiti()
  }

  async trovaPreferiti(){
    this.favorites = await this.mainSrv.findFavorite(this.user.id).toPromise()
  }

  async aggiungiFavoriti(id:number){
   await this.mainSrv.addFav({movieId:id, userId: this.user.id}).toPromise()
  }

  async rimuoviFavoriti(id:number){
    await this.mainSrv.removeFav(id).toPromise()
  }

 async verificaPreferiti(id:number){
  await this.verificaId(id)
  this.coloraPreferiti(id)
 }


 async verificaId(id:number){
    await this.trovaPreferiti()
    const found = this.favorites.find((film:any) => film.movieId == id);
    if(found === undefined){
      this.aggiungiFavoriti(id)
    } else {
      this.rimuoviFavoriti(found?.id)
    }
  }

  //Manca la logica di come colorare le icone
  async coloraPreferiti(id:number){
    await this.trovaPreferiti()
    const colore = this.favorites.some((film:any) => film.movieId == id)
    if(colore) {
      this.preferito = true
    } else {
      this.preferito = false
    }
  }

}
