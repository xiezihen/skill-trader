import { Component, OnInit } from '@angular/core';
import { Post } from '../_models/Post';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Observable<Post[]>;
  constructor(private http: HttpClient) {}
  title = 'eventApp';

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.posts = this.http.get<Post[]>(`${environment.apiUrl}/posts`);
  }
}
