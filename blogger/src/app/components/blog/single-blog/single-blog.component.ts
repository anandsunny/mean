import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogService } from '../../../services/blog.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CommonService } from '../../../services/common.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.css']
})
export class SingleBlogComponent implements OnInit {

  blogId: any;
  blog: Object = {};
  serverUrl: String = 'http://localhost:3000';
  createdBy: String;
  user: Object = {};
  uname: Object = {};

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _blogService: BlogService,
    private _flashMessagesService: FlashMessagesService,
    private _commonService: CommonService,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(data => {
      this.blogId = data.get('id');
    });
    this.getBlog();
  }

  getBlog() {
    this._blogService.blog(this.blogId).subscribe((data: any ) => {
      // console.log(data);
      this.blog = data.blog[0];
      this.createdBy = data.blog[0].createdBy;
      this.getBlogCreater();
    },
  (err: HttpErrorResponse) => {
    this._flashMessagesService.show(`${err.error.message}`, {cssClass: 'txt_danger'});
  });

  }

  // details of blog creater
  getBlogCreater() {
    this._commonService.getSingle('user', 'uname', this.createdBy).subscribe((data: any) => {
      this.user = data.result[0];
    }, (err: HttpErrorResponse) => {
      this._flashMessagesService.show(`${err.error.message}`, {cssClass: 'txt_danger'});
    });
    this.uname = JSON.parse(localStorage.getItem('user'));
  }

}
