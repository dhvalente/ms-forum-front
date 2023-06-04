import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from 'src/app/model/login';
import { TokenJWT } from 'src/app/model/tokenJWT';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/model/user';


@Injectable({
  providedIn: 'root'
})
export class LoginService {


  private readonly API = 'http://localhost:8080/api/auths'

  constructor(private http: HttpClient) { }


  login(login: Login): Observable<TokenJWT> {
    return this.http.post<TokenJWT>(this.API, login).pipe(
      tap((token: TokenJWT) => {
        console.log("TOKEN SALVO : "+ token.token)
        localStorage.setItem('token', token.token); // Salvar o token no armazenamento local
      })
    );
  }
}
