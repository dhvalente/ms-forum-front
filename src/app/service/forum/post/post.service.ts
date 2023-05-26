import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Post } from 'src/app/model/post';
import { Observable } from 'rxjs';
import { Page } from 'src/app/model/page';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly API = 'http://localhost:8080/api/posts'

  constructor(private http: HttpClient) { }

  findAll(page: number): Observable<Page<Post>> {
    const size = 10;
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<Post>>(this.API, { params }).pipe(
      tap((response: Page<Post>) => {
        console.log('Response from API:', response);
      })
    );
  }

  create(post :Post) : Observable<Post>{
    return this.http.post<Post>(this.API , post);
  }

  delete(id : string) : Observable<Post>{
    const url =`${this.API}/${id}`
    return this.http.delete<Post>(url)

  }

  findById(id : string) : Observable<Post>{
    const url =`${this.API}/${id}`
    console.log(url);
    return this.http.get<Post>(url)

  }
}
