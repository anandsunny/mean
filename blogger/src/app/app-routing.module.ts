import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';

// guards
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';
import { BlogComponent } from './components/blog/blog.component';
import { CreateComponent } from './components/blog/create/create.component';
import { SingleBlogComponent } from './components/blog/single-blog/single-blog.component';
import { BlogListResolverService } from './services/blog-list-resolver.service';

const routes: Routes = [
  { path: '', component: HomeComponent, resolve: {blogList: BlogListResolverService} ,pathMatch: 'full' },
  { path: 'blog', children: [
    { path: 'create', component: CreateComponent, canActivate: [AuthGuard] },
    {path: ':id', component: SingleBlogComponent },
    { path: 'edit/:id', component: CreateComponent, canActivate: [AuthGuard] }
  ]},
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] },
  { path: 'signUp', component: RegisterComponent, canActivate: [NotAuthGuard] },
  { path: 'auth', loadChildren: './modules/auth/auth.module#AuthModule' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
