export interface PaginateParams {
  _page: number;
  _limit: number;
}

export interface PostComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
