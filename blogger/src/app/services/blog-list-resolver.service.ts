import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Blog } from '../classes/blog';
import { Observable } from 'rxjs';
import { FlashMessagesService } from 'angular2-flash-messages';
import { HttpErrorResponse } from '@angular/common/http';
import { BlogService } from './blog.service';

@Injectable({
  providedIn: 'root'
})
export class BlogListResolverService implements Resolve<Object> {

  constructor(
    private _flashMessagesService: FlashMessagesService,
    private _blogService: BlogService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Object> | Promise<Object> | Object {
    return this._blogService.blogs();
  }
}
