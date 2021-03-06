
// modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppMaterialModule } from './modules/app-material/app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { FlashMessagesModule } from 'angular2-flash-messages';


// components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DragDropModule } from '@angular/cdk/drag-drop';

// directives 
// import { BlogModule } from './components/blog/blog.module';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './components/inc/header/header.component';
import { NavbarComponent } from './components/inc/header/navbar/navbar.component';
import { BlogComponent } from './components/blog/blog.component';
import { CreateComponent } from './components/blog/create/create.component';
import { SingleBlogComponent } from './components/blog/single-blog/single-blog.component';

// get token
export function tokenGetter(): string {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    HomeComponent,
    BlogComponent,
    SingleBlogComponent,
    CreateComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlashMessagesModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3000']
      }
    }),
    LayoutModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
