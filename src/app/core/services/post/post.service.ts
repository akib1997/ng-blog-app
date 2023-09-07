import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginateParams, PostComment } from '@app/models/common.model';
import { Post } from '@app/models/post.model';
import { environment } from '@env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private paths = {
    post: `${environment.apiUrl}/posts`,
  };

  constructor(private http: HttpClient) {}

  getPosts(paginateParams?: PaginateParams): Observable<Post[]> {
    const { _page, _limit } = paginateParams!;
    const params = new HttpParams().set('_page', _page).set('_limit', _limit);
    return this.http.get<Post[]>(`${this.paths.post}`, { params });
  }

  getPost(postId: number): Observable<Post> {
    return this.http.get<Post>(`${this.paths.post}/${postId}`, {  });
  }

  getComments(postId: number): Observable<PostComment[]> {
    return this.http.get<PostComment[]>(`${this.paths.post}/${postId}/comments`, {});
  }
}
