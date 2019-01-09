import { Component, OnInit, Input } from '@angular/core';
import { Blog } from '../../../classes/blog';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogService } from '../../../services/blog.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-blog-tile',
  templateUrl: './blog-tile.component.html',
  styleUrls: ['./blog-tile.component.css']
})
export class BlogTileComponent implements OnInit {

  blogList: Blog[];
  userName: string;

  constructor(
    private _router: Router,
    private _blogService: BlogService,
    private _flashMessagesService: FlashMessagesService,
    private _actRoute: ActivatedRoute
  ) { 
    this.userName = JSON.parse(localStorage.getItem('user')).username;
  }

  ngOnInit() {
    this._actRoute.data.subscribe((data: any) => {
      this.blogList = data.blogList.result;
    }, (err: HttpErrorResponse) => {
      this._flashMessagesService.show(`${err.error.message}`, {cssClass: 'txt_danger'});
    })
  }

  // for reach up to single blog
  reachSigleBlog(blogId) {
    this._router.navigate([`blog/${blogId}`]);
  }

  // edit route
  edit(blogId) {
    this._router.navigate(['blogs/edit', blogId]);
  }

  // delete blog by id
  delete(blogId) {
    if(confirm('Do you want to delete it?')) {
      
    this._blogService.delete('blog','_id', blogId).subscribe((data: any) => {
      
        this._flashMessagesService.show('Blog deleted.', {cssClass: 'alert_success'});
        this._blogService.blogs().subscribe((res: any) => {
        this.blogList = res.result; 
        console.log(res)
    }, err => console.log(err));
  }

}

}
