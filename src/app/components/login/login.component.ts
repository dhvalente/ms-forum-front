import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {



  email: string = '';
  password: string = '';
  showSuccess: boolean = false;

  form!: FormGroup;

  constructor(
    private service: LoginService,
    private router: Router,
    private routes: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['' , Validators.compose([
        Validators.required,
        Validators.minLength(6),
      ])],
      password: ['',  Validators.compose([
        Validators.required ,
        Validators.minLength(5),
      ])],
    });
  }

  login() {
    if(this.form.valid){
      this.service.login(this.form.value).subscribe((postReturn) => {
        this.showSuccess = true;
        setTimeout(() => {
          this.router.navigateByUrl('forum-topic');
        }, 800); // delay de 2 segundos
      });
    }
  }

}
