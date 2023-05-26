import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from './../../../model/user';
import { Component, Inject, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post';
import { PostService } from 'src/app/service/forum/post/post.service';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from 'src/app/model/page';

@Component({
  selector: 'app-forum-topic',
  templateUrl: './forum-topic.component.html',
  styleUrls: ['./forum-topic.component.scss'],
})
export class ForumTopicComponent implements OnInit {

  showSuccess :boolean = false
  postResponse: Page<Post>[] = [];
  posts: Post[] = [];
  paginaAtual: number = 0;
  post: Post = {
    id: '',
    title: '',
    content: '',
    authorId: '',
    topic: '',
  };

  public content: string = 'Deseja realmente excluir?';

  constructor(
    private service: PostService,
    private modalService: NgbModal,
    private router: Router,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.service.findAll(this.paginaAtual).subscribe((page) => {
      this.postResponse = [page];
      this.posts = this.getPostsFromPages(this.postResponse);
      console.log(this.posts)

    });
  }


  getPostsFromPages(pages: Page<Post>[]): Post[] {
    const posts: Post[] = [];
    pages.forEach((page) => {
      posts.push(...page.content);
    });
    return posts;
  }

  updatePost(p: any) {
    console.log(p);
  }

  openConfirmationModal(content: any, id: string) {
    this.showSuccess = false;
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result: any) => {
          // ...
        },
        (reason: any) => {
          // ...
        }
      );
  }

  deletePost(moda: NgbModal, id: string) {
    console.log("ID :" + id)
    this.service.delete(id!).subscribe(() => {
      this.showSuccess = true;
      setTimeout(() => {
        this.modalService.dismissAll();
      }, 1000); // delay de 2 segundos
      this.service.findAll(this.paginaAtual).subscribe((page) => {
        this.postResponse = [page];
        this.posts = this.getPostsFromPages(this.postResponse);

      });
    });
  }

  listPost(post :Post){
    this.router.navigate(['/list-post'])
  }
}
