import { Component, OnInit, Input } from '@angular/core';
import { Blog } from '../../classes/blog';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogList: Blog[];
  userName: string;
  userId: string;

  constructor(
    private _router: Router,
    private _blogService: BlogService,
    private _flashMessagesService: FlashMessagesService,
    private _actRoute: ActivatedRoute,
    private _commonService: CommonService
  ) {
    
    if(localStorage.getItem('user')) {
      this.userName = JSON.parse(localStorage.getItem('user')).username;
    this._commonService.getSingle('user', 'uname', this.userName).subscribe((res: any) => {
      if(res.message) {
        this.userId = res.result[0]._id;
      }
    }, err => console.log(err));
  }
  }

  ngOnInit() {
   

    this._actRoute.data.subscribe((data: any) => {
      this.blogList = data.blogList.result;
    }, (err: HttpErrorResponse) => {
      this._flashMessagesService.show(`${err.error.message}`, { cssClass: 'txt_danger' });
    })
  }

  // for reach up to single blog
  reachSigleBlog(blogId) {
    this._router.navigate(['blog', blogId]);
  }

  // edit route
  edit(blogId) {
    this._router.navigate(['blog/edit', blogId]);
  }

  // delete blog by id
  delete(blogId) {
    if (confirm('Do you want to delete it?')) {
      this._blogService.delete('blog', '_id', blogId).subscribe((data: any) => {
        this._flashMessagesService.show('Blog deleted.', { cssClass: 'alert_success' });
        this.refresh();
      }, err => console.log(err));
    }
  }

  // switch to create route
  create() {
    this._router.navigate(['blog/create']);
  }

  // like button click
  like(blogId) {
    // if user is logged-in
    if(this.userName) {
      this._blogService.liked(blogId).subscribe((res: any) => {
        if(res.success) {
          this.refresh();
          this._flashMessagesService.show(res.result, { cssClass:  'alert_success'});
        } else {
          this._flashMessagesService.show(res.result, {cssClass: 'alert_danger' });
        }
      }, err => console.log(err));
    } else {
      // user is not logged-in
      this._router.navigate(['login']);
    }
    
  }

  // refresh blogs
  refresh() {
    this._blogService.blogs().subscribe((res: any) => {
      this.blogList = res.result;
    }, err => console.log(err));
  }

  // track only like blog when user click on like
  trackBlogLike(index: number, blog: any): number {
    return blog.likes;
  }

}
