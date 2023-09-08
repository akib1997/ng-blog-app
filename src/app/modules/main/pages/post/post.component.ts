import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostComment } from '@app/models/common.model';
import { Post } from '@app/models/post.model';
import { AuthService } from '@app/services/auth/auth.service';
import { NavigateService } from '@app/services/navigate/navigate.service';
import { PostStateService } from '@app/states/post/post-state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  postId!: number;
  isLoggedIn = false;
  newCommentText: string = '';
  newComment: PostComment;

  constructor(
    private route: ActivatedRoute,
    private postStateService: PostStateService,
    private navigateService: NavigateService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe({
      next: (res) => {
        this.isLoggedIn = res;
      },
    });
    this.postId = +this.route.snapshot.paramMap.get('id')! as number;
    this.postStateService.store.setState({ postId: this.postId });
  }

  submitComment() {
    this.newComment = {
      body: this.newCommentText,
      name: this.authService.getCurrentUser()?.userName,
      email: generateRandomEmail(),
      id: Math.floor(Math.random() * 1000),
      postId: Math.floor(Math.random() * 1000),
    };
    const currentComments = this.postStateService.store.getState().comments;
    const updatedComments = [
      this.newComment,
      ...(currentComments as PostComment[]),
    ];
    this.postStateService.store.setState({ comments: updatedComments });
    this.newCommentText = '';
  }

  get comments$(): Observable<PostComment[]> {
    return this.postStateService.store.select('comments') as Observable<
      PostComment[]
    >;
  }

  get post$(): Observable<Post> {
    return this.postStateService.store.select('post') as Observable<Post>;
  }

  get loading$(): Observable<boolean> {
    return this.postStateService.store.select('loading');
  }

  redirectToLogin() {
    const returnUrl = this.router.url;
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl } });
  }

  back(): void {
    this.navigateService.toApp();
  }
}

function generateRandomEmail(): string {
  const usernameLength = 10; // Length of the username
  const username = generateRandomString(usernameLength);
  const domain = 'example.com'; // You can change this to your desired domain

  return `${username}@${domain}`;
}

function generateRandomString(length: number): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}
