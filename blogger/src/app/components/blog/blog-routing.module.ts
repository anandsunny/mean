import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './blog.component';
import { SingleBlogComponent } from './single-blog/single-blog.component';
import { CreateComponent } from './create/create.component';
import { AuthGuard } from '../../guards/auth.guard';
import { BlogListResolverService } from '../../services/blog-list-resolver.service';

const routes: Routes = [
  { path: 'blogs', children: [
    { path: '', component: BlogComponent, resolve: {blogList: BlogListResolverService}} ,
    { path: 'create', component: CreateComponent, canActivate: [AuthGuard] },
    { path: 'edit/:id', component: CreateComponent, canActivate: [AuthGuard] }
  ]}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class BlogRoutingModule { }
