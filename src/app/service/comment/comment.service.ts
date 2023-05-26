import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/model/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private readonly API = 'http://localhost:8080/api/comments'

  constructor(private http: HttpClient) { }


  create(comment :Comment) : Observable<Comment>{
    return this.http.post<Comment>(this.API , comment);
  }

  findAllByPost(id : string){
    const url =`${this.API}/${id}`
    console.log("Spy url "+ url)
    return this.http.get<Comment[]>(url)
  }
}
