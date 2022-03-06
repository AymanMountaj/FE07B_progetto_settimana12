import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';


@Component({
  template: `
    <div class="container">
        <form #form="ngForm" (ngSubmit)="onSignUp(form)">
          <div class="form-container">
            <mat-form-field class="example-form-field" appearance="fill">
              <mat-label>Nome e cognome</mat-label>
              <input matInput type="text" name="name" [(ngModel)]="form.value.name"/>
              <button *ngIf="form.value.name" matSuffix mat-icon-button aria-label="Clear" (click)="form.value.name=''">
                <mat-icon>close</mat-icon>
              </button>
            </mat-form-field>

            <mat-form-field class="example-form-field" appearance="fill">
              <mat-label>Email</mat-label>
              <input matInput type="text" name="email" [(ngModel)]="form.value.email"/>
              <button *ngIf="form.value.email" matSuffix mat-icon-button aria-label="Clear" (click)="form.value.email = ''">
                <mat-icon>close</mat-icon>
              </button>
            </mat-form-field>

            <mat-form-field class="example-form-field" appearance="fill">
              <mat-label>Password</mat-label>
              <input matInput type="text" name="password" [(ngModel)]="form.value.password"/>
              <button *ngIf="form.value.password" matSuffix mat-icon-button aria-label="Clear" (click)="form.value.password =''">
                <mat-icon>close</mat-icon>
              </button>
            </mat-form-field>
            <div class="form-bottom">
              <button type="submit" mat-raised-button color="primary">Registrati</button>
              <p>Sei registrato? <a class="text-success" (click)="redirectLogin()">Login</a></p>
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
export class SignUpPage implements OnInit {

  constructor(private router: Router, private authSrv: AuthService) { }

  ngOnInit(): void {
  }

  async onSignUp(form: NgForm) {
    try {
      console.log(form.value.name)
      await this.authSrv.signUp(form.value).toPromise();
      form.reset();
      console.log(form.value)
      this.router.navigate(['/login'])
    } catch (error: any) {
      alert(error);
    }

  }
  redirectLogin(){
    this.router.navigate(['/login'])
  }
}
