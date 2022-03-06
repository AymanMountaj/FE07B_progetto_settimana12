import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';


@Component({
  template: `
  <mat-card class="text-center">
    <p>{{user.name}}</p>
    <p>{{user.email}}</p>
  </mat-card>

  `,
  styles: [
  ]
})
export class ProfiloPage implements OnInit {
  user!: any

  constructor(private mainSrv: MainService) { }

  async ngOnInit(){
   this.user =  await this.mainSrv.getUtente()?.toPromise()
  }

}
