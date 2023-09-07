import { Injectable, OnDestroy } from '@angular/core';
import { Post } from '@app/models/post.model';
import { Store } from '@app/store/store';
import {
  Subject,
  combineLatest,
  debounceTime,
  forkJoin,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { PostService } from '@services/post/post.service';
import { PostComment } from '@app/models/common.model';

@Injectable({ providedIn: 'root' })
export class PostStateService implements OnDestroy {
  private unsubscriber: Subject<void> = new Subject<void>();

  store = new Store<{
    loading: boolean;
    postId: number | null;
    post: Post | null;
    comments: PostComment[] | null;
  }>(
    {
      loading: false,
      postId: null,
      post: null,
      comments: [],
    },
    this.unsubscriber
  );

  constructor(private postService: PostService) {
    this.init();
  }

  private init(): void {
    combineLatest({
      postId: this.store.select('postId'),
    })
      .pipe(
        debounceTime(500),
        tap(() => this.store.setState({ loading: true })),
        switchMap(({ postId }) => {
          return forkJoin([
            this.postService.getPost(postId!),
            this.postService.getComments(postId!),
          ]);
        }),
        takeUntil(this.unsubscriber)
      )
      .subscribe({
        next: ([post, PostComment]) => {
          this.store.setState({
            post,
            comments: PostComment,
            loading: false,
          });
        },
      });
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }
}
