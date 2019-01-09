import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Blog } from '../classes/blog';



@Injectable({
  providedIn: 'root'
})
export class BlogService {

  list: any;
  constructor(
    private _httpClient: HttpClient,
    private _authService: AuthService
  ) { }

  // get blogs
  blogs() {
    this._authService.authHeaders();
    return this._httpClient.get(`${this._authService.rootUrl}blogs`, {headers: this._authService.headers});
  }

  refresh() {
    this._authService.authHeaders();
    this._httpClient.get(`${this._authService.rootUrl}blogs`, {headers: this._authService.headers}).subscribe((res: any) => {
      this.list = res.result;
      return this.list;
    });
  }

  // create new blog
  newBlog(blog) {
    return this._httpClient.post(`${this._authService.rootUrl}blogs`, blog);
  }

  // get blog
  blog(blogId) {
    return this._httpClient.get(`${this._authService.rootUrl}blogs/${blogId}`);
  }

  //edit blog
  edit(blogId, blog) {
    return this._httpClient.patch(`${this._authService.rootUrl}blogs/${blogId}`, blog);
  }

  // delete blog
  delete(table, field, field_value) {
    return this._httpClient.delete(`${this._authService.rootUrl}common/${table}/${field}/${field_value}`);
  }
}
