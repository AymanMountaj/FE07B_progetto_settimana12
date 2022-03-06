import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardGuard } from './auth/guard.guard';
import { LoginPage } from './auth/login.page';
import { SignUpPage } from './auth/sign-up.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FilmPage } from './dashboard/pages/film.page';
import { ProfiloPage } from './dashboard/pages/profilo.page';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'sign-up',
    component: SignUpPage
  },
  {
    path: 'home',
    component:DashboardComponent,
    canActivate:[GuardGuard],
    children:[
      {
        path:'profilo',
        component: ProfiloPage
      },
      {
        path: 'film',
        component: FilmPage
      }

    ]
  },
  {
    path:"**",
    redirectTo:"login"
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
