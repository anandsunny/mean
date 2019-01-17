import { NgModule } from '@angular/core';


import { BlogComponent } from './blog.component';
import { SingleBlogComponent } from './single-blog/single-blog.component';
import { CreateComponent } from './create/create.component';
import { BlogRoutingModule } from './blog-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
  ],
  imports: [
    SharedModule,
    BlogRoutingModule
  ]
})
export class BlogModule { }
