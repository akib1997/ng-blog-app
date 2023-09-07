import { Component, OnInit } from '@angular/core';
import { Post } from '@app/models/post.model';
import { PostsStateService } from '@state/posts/posts-state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  currentPage!: number;
  constructor(private postsStateService: PostsStateService) {}

  ngOnInit(): void {
    this.postsStateService.store.setState({ _page: 0 });
  }

  get posts$(): Observable<Post[]> {
    return this.postsStateService.store.select('posts');
  }

  get loading$(): Observable<boolean> {
    return this.postsStateService.store.select('loading');
  }

  changePage(pageNumber: 1 | -1): void {
    const page = this.postsStateService.store.getState()._page;
    console.log(this.currentPage);
    const next = Math.max(page + pageNumber, 0);
    this.currentPage = next;
    this.postsStateService.store.setState({ _page: next });
  }
}
