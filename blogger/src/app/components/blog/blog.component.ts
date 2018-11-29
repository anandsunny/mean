import { Component, OnInit } from '@angular/core';
import { GetBlogsService } from '../../services/get-blogs.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogs: any;
  userName: Object;
  constructor(
    private _blogService: GetBlogsService,
    private _flashMessagesService: FlashMessagesService,
    private _router: Router
  ) { 
    this.getBlogs();
    this.userName = JSON.parse(localStorage.getItem('user')).username;
  }

  ngOnInit() {
    setTimeout(() => {
      console.log(this.blogs);
    }, 2000)
  }

  // get All blogs 
  getBlogs() {
    this._blogService.getAllBlogs().subscribe((data: any) => {
      this.blogs = data.blogs;
    }, (err: HttpErrorResponse) => {
      this._flashMessagesService.show(`${err.error.message}`, {cssClass: 'txt_danger'});
    })
  }



}
