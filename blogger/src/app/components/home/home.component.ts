import { Component, OnInit } from '@angular/core';
import { Blog } from '../../classes/blog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  blogList: Blog[];

  constructor(
    private _actRoute: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this._actRoute.data.subscribe((blogs: any) => {
      if (blogs.blogList.success) {
        this.blogList = blogs.blogList.result;
      } else {
        alert('Somethings are bad!!!');
        this._router.navigate(['page-not-found']);
      }
    });
  }

}
