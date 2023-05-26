import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token'); // Obtenha o token do armazenamento local
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}` // Anexe o token no cabeçalho de autorização
        }
      });
    }

    return next.handle(request);
  }
}
