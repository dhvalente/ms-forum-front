import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private readonly API = 'http://localhost:8080/api/users'

  constructor(private http: HttpClient) { }

  findUserByToken(id : string) : Observable<User>{
    const url =`${this.API}/findUserToken/${id}`
    console.log(url);
    return this.http.get<User>(url)
  }
}
