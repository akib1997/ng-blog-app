import { Component, Input, OnInit } from '@angular/core';
import { PostComment } from '@app/models/common.model';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss'],
})
export class CommentCardComponent implements OnInit {
  @Input() comment!: PostComment;
  constructor() {}

  ngOnInit(): void {}
}
