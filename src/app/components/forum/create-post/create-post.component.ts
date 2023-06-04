import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/service/forum/post/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  topic: string = '';
  authorId: string = '646e67ff23a10b5d70b68519';
  title: string = '';
  content: string = '';
  showSuccess: boolean = false;

  form!: FormGroup;

  user!: User;

  constructor(
    private service: PostService,
    private router: Router,
    private routes: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.getUserByToken();
    this.form = this.formBuilder.group({
      authorId: [this.user ? this.user.id : ''],
      title: ['' , Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/(.|\s)*\S(.|\s)*/),
      ])],
      content: ['',  Validators.compose([
        Validators.required ,
        Validators.minLength(8),
        Validators.pattern(/(.|\s)*\S(.|\s)*/),
      ])],


      topic: ['', [Validators.required]],
    });
  }

  createPost() {
    if (this.form.valid) {
      this.form.patchValue({ authorId: this.user ? this.user.id : '' }); // Definir o valor de authorId no formulário
      const post = this.form.value;
      this.service.create(post).subscribe((postReturn) => {
        this.showSuccess = true;
        setTimeout(() => {
          this.router.navigateByUrl('forum-topic');
        }, 800);
      });
    }
  }

  getUserByToken () {
    const token = localStorage.getItem('token');
    console.log("Token :"+ token);
    this.userService.findUserByToken(token!).subscribe(
      (response) => {
        console.log('Usuário encontrado:', response);
        this.user = response;
        console.log("Email : "+this.user.email)
      },
      (error) => {
        console.error('Erro ao buscar usuário:', error);
        // Trate o erro adequadamente
      }
    );
  }

}
