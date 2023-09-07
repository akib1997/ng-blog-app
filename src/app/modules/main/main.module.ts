import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { MainRoutingModule } from './main-routing.module';
import { PostsComponent } from './pages/posts/posts.component';
import { PostComponent } from './pages/post/post.component';
import { PostsStateService } from '@app/states/posts/posts-state.service';
import { HeaderComponent } from './components/header/header.component';
import { CommentCardComponent } from './components/comment-card/comment-card.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SkeletonComponent } from './components/skeleton/skeleton.component';



@NgModule({
  declarations: [
    MainComponent,
    PostCardComponent,
    PostsComponent,
    PostComponent,
    HeaderComponent,
    CommentCardComponent,
    SkeletonComponent
  ],
  providers: [],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class MainModule { }
