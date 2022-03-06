import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DatiLogin } from '../models/login';
import { DatiSignUp } from '../models/signup';
import { catchError, map, tap } from 'rxjs/operators'
import { JwtHelperService } from '@auth0/angular-jwt'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:4201'
  private authSubject = new BehaviorSubject<null | DatiLogin>(null)
  user$ = this.authSubject.asObservable();
  jwtHelper = new JwtHelperService();
  isLoggedIn$ = this.user$.pipe(map(user=> !!user))

  autoLogoutTimer: any

  constructor(private http: HttpClient, private router : Router) {
    this.restoreUser()
  }

  signUp(data: DatiSignUp) {
    return this.http.post(`${this.url}/register`, data);
  }

  login(data: DatiLogin) {
    return this.http.post<DatiLogin>(`${this.url}/login`, data).pipe(tap(val => {
      console.log(val)
    }), tap(data => {
      this.authSubject.next(data);
      localStorage.setItem('user', JSON.stringify(data))
      const expirationDate = this.jwtHelper.getTokenExpirationDate(data.accessToken) as Date
      this.autoLogout(expirationDate)
    })
    )
  }
  restoreUser(){
    const userJson = localStorage.getItem('user')
    if(!userJson){
      return
    }
    const user:DatiLogin = JSON.parse(userJson)
    if(this.jwtHelper.isTokenExpired(user.accessToken)){
      return
    }
    this.authSubject.next(user)
    const expirationDate = this.jwtHelper.getTokenExpirationDate(user.accessToken) as Date
    this.autoLogout(expirationDate)

  }
  logout(){
    this.authSubject.next(null);
    this.router.navigate(['/login'])
    localStorage.removeItem('user')
    if(this.autoLogoutTimer){
      clearTimeout(this.autoLogoutTimer)
    }
  }
  autoLogout(expirationDate: Date) {
    const expMs = expirationDate.getTime() - new Date().getTime()
    this.autoLogoutTimer = setTimeout(() => {
      this.logout()
    }, expMs)
  }
}


