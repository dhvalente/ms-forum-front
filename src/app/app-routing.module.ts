import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumComponent } from './components/forum/forum.component';
import { ForumTopicComponent } from './components/forum/forum-topic/forum-topic.component';
import { CreatePostComponent } from './components/forum/create-post/create-post.component';
import { ListPostComponent } from './components/forum/list-post/list-post.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
    {
      path:'',
      redirectTo:'forum-homepage',
      pathMatch:'full'
    },
    {
      path:'forum-homepage',
      component: ForumComponent
    },
    {
      path:'forum-topic',
      component:ForumTopicComponent
    },
    {
      path:'create-post',
      component: CreatePostComponent
    },
    {
      path:'list-post/:id',
      component: ListPostComponent
    },
    {
      path:'login',
      component: LoginComponent
    },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
