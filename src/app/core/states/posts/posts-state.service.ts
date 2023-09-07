import { Injectable, OnDestroy } from '@angular/core';
import { Post } from '@app/models/post.model';
import { Store } from '@app/store/store';
import {
  Subject,
  combineLatest,
  debounceTime,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { PostService } from '../../services/post/post.service';

@Injectable({ providedIn: 'root' })
export class PostsStateService implements OnDestroy {
  private unsubscriber: Subject<void> = new Subject<void>();

  store = new Store<{
    loading: boolean;
    posts: Post[];
    _page: number;
    _limit: number;
  }>(
    {
      loading: false,
      posts: [],
      _page: 0,
      _limit: 10,
    },
    this.unsubscriber
  );

  constructor(private postService: PostService) {
    this.init();
  }

  private init(): void {
    combineLatest({
      _page: this.store.select('_page'),
      _limit: this.store.select('_limit'),
    })
      .pipe(
        debounceTime(500),
        tap(() => this.store.setState({ loading: true })),
        switchMap(({ _page, _limit }) => {
          return this.postService.getPosts({ _page, _limit });
        }),
        takeUntil(this.unsubscriber)
      )
      .subscribe({
        next: (res) => {
          this.store.setState({
            posts: res,
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
