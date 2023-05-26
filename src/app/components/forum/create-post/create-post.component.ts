import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/service/forum/post/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  topic: string = '';
  authorId: string = '6446743f1bc8ff71063a47f3';
  title: string = '';
  content: string = '';
  showSuccess: boolean = false;

  form!: FormGroup;

  constructor(
    private service: PostService,
    private router: Router,
    private routes: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  createPost() {
    console.log(this.form.get('content')?.errors)
    if(this.form.valid){
      this.service.create(this.form.value).subscribe((postReturn) => {
        this.showSuccess = true;
        setTimeout(() => {
          this.router.navigateByUrl('forum-topic');
        }, 800); // delay de 2 segundos
      });
    }
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      authorId: ['6446743f1bc8ff71063a47f3'],
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
  }
