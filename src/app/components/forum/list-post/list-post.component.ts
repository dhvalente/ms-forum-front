import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from 'src/app/model/comment';
import { Post } from 'src/app/model/post';
import { CommentService } from 'src/app/service/comment/comment.service';
import { PostService } from 'src/app/service/forum/post/post.service';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss']
})
export class ListPostComponent implements OnInit {

  exibirFormulario :boolean = false;

  showSuccess: boolean = false;

  constructor(
    private location: Location,
    private commentService : CommentService,
    private service: PostService,
    private route: Router,
    private routes:ActivatedRoute)
    {}

  post: Post = {
    id: '',
    title: '',
    content: '',
    authorId: '',
    topic: '',
  };


  authorId: string = "6446743f1bc8ff71063a47f3"
  content:string = ""
  postId : string = ""
  numberOfLikes : number = 20

  comment : Comment = {
    content : '',
    authorId : '6446743f1bc8ff71063a47f3',
    postId: '',
  }

  curtidasPostagem : number = 10;

  comments: Comment[] = [];

  ngOnInit(): void {
    const id = this.routes.snapshot.paramMap.get('id')
    this.service.findById(id!).subscribe(post => {
      this.post = post;
      this.comment.postId = post.id!;
      this.commentService.findAllByPost(post.id!).subscribe(comments => {
        this.comments = comments; });
      });
  }

  curtirPostagem(){
    console.log(this.post.title)
    console.log("Curtiu a postagem")
  }

  comentar(){
    this.exibirFormulario = true;
  }

  addComment() {
    var commentDTO: Comment = {
      postId: this.postId,
      authorId: this.authorId,
      content: this.content,
    };

    commentDTO.authorId = this.authorId;
    commentDTO.content = this.content;
    commentDTO.postId = this.post.id!;

    this.commentService.create(commentDTO).subscribe((postReturn) => {
      this.showSuccess = true;
      setTimeout(() => {
        this.refreshPage();
      }, 800); // delay de 2 segundos
    });
  }
  cancelComment(){
    this.exibirFormulario = false;
  }

  refreshPage() {
    window.location.reload();
  }
}
