import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class GetBlogsService {

  constructor(
    private _httpClient: HttpClient,
    private _authService: AuthService
  ) { }

  // get all blogs
  getAllBlogs() {
    this._authService.authHeaders();
    return this._httpClient.get(`${this._authService.rootUrl}blogs/blogs`, {headers: this._authService.headers});
  }

  // create new blog
  newBlog(blog) {
    // fuction to create header to add token for http request
    this._authService.authHeaders();
    return this._httpClient.post(`${this._authService.rootUrl}blogs/newBlog`, blog, {headers: this._authService.headers});
  }
}
