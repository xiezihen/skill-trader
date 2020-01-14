import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PostsComponent } from './posts/posts.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { JwtInterceptor} from './_helpers/jwt.interceptor';
import { ErrorInterceptor} from './_helpers/error.interceptor';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NewPostComponent } from './new-post/new-post.component';


@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    NavbarComponent,
    NewPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
