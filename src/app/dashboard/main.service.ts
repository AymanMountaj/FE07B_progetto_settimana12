import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie';
import { DatiLogin } from '../models/login';
import { Favorite } from '../models/favorite';

@Injectable({
  providedIn: 'root'
})
export class MainService {



  constructor(private http: HttpClient) { }

  getMovie(){
    return this.http.get<Movie[]>(`${environment.apiBaseUrl}/movies-popular`)
  }

  getUtente(){
    const userJson = localStorage.getItem('user')
    if(!userJson){
      return
    }
    const userData: DatiLogin = JSON.parse(userJson)

    return this.http.get<DatiLogin>(`${environment.apiBaseUrl}/users/${userData.user.id}`)
  }

  findFavorite(id:number){
    return this.http.get<Favorite[]>(`${environment.apiBaseUrl}/favorites?userId=${id}`)
  }


  addFav(data: {movieId:number, userId:number}){
    return this.http.post<Favorite>(`${environment.apiBaseUrl}/favorites`, data)
  }

  removeFav(id:number){
    return this.http.delete(`${environment.apiBaseUrl}/favorites/${id}`)
  }





}
