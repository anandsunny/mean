import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { CreateComponent } from './create/create.component';
import { Blog } from '../../classes/blog';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogs: Blog[];
  blogDisplay: Blog;
  userName: Object;

  constructor(
    private _blogService: BlogService,
    private _flashMessagesService: FlashMessagesService,
    private _router: Router,
    public dialog: MatDialog,
    private _activatedRoute: ActivatedRoute 
  ) { 


    
    // this.userName = JSON.parse(localStorage.getItem('user')).username;
  }

  ngOnInit() {
  }



  // on edit button
  // edit(blogId): void {
  //   const dialogRef = this.dialog.open(CreateComponent, {
  //     data: {
  //       action: 'editBlog',
  //       id: blogId
  //     }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if(result) {
  //       this._flashMessagesService.show('Blog Edited Successful!', {cssClass: 'alert_success'});
  //       this._activatedRoute.data.subscribe((data: any) => {
  //         this.blogs = data.blogList.blogs;
  //       }, (err: HttpErrorResponse) => {
  //         this._flashMessagesService.show(`${err.error.message}`, {cssClass: 'txt_danger'});
  //       })
  //     }
  //     console.log(result);
  //   });
  // }

  // edit(blogId) {
  //   this._router.navigate(['blogs/edit', blogId]);
  // }
}
