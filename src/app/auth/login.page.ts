import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  template: `
  <div class="container">
        <form #form="ngForm" (ngSubmit)="onLogin(form)">
          <div class="form-container">
          <mat-form-field class="example-form-field" appearance="fill">
              <mat-label>Email</mat-label>
              <input matInput type="text" name="email" [(ngModel)]="form.value.email"/>
              <button *ngIf="form.value.email" matSuffix mat-icon-button aria-label="Clear" (click)="form.value.email">
                <mat-icon>close</mat-icon>
              </button>
            </mat-form-field>

            <mat-form-field class="example-form-field" appearance="fill">
              <mat-label>Password</mat-label>
              <input matInput type="password" name="password" [(ngModel)]="form.value.password"/>
              <button *ngIf="form.value.password" matSuffix mat-icon-button aria-label="Clear" (click)="form.value.password">
                <mat-icon>close</mat-icon>
              </button>
            </mat-form-field>
            <div class="form-bottom">
              <button type="submit" mat-raised-button color="primary">Accedi</button>
              <p>Non sei registrato? <a class="text-success" (click)="redirectSignUp()">Registrati</a></p>
            </div>
          </div>
        </form>

        <!-- <div *ngIf="errorMessage">
          {{errorMessage}}
        </div> -->
   </div>
  `,
  styles: [`
  .container {
    margin: 14% auto;
    width:20%;
  }
  a {
    text-decoration: none
  }
  a:hover {
    text-decoration: underline;
    cursor:pointer;
  }
  .form-container {
    display:flex;
    flex-direction:column;
  }
  .form-bottom{
    display: flex;
    justify-content: space-between;
  }
  `
  ]
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private authSrv: AuthService) { }

  ngOnInit(): void {
    console.log('Esisto??')
  }

  async onLogin(form:NgForm){
    try {

      await this.authSrv.login(form.value).toPromise()
      form.reset()
      this.router.navigate(['/home/film'])

    } catch (error:any) {
      alert(error)
    }
  }

  redirectSignUp(){
    this.router.navigate(['/sign-up'])
  }

}
