import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import firebase from 'firebase/app';
import { MyFeedComponent } from './my-feed/my-feed.component';
import { CapitalizePipe } from './capitalize.pipe';
import { PostComponent } from './post/post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { ViewComponent } from './view/view.component';
import { ProfileComponent } from './profile/profile.component';
import { CommentComponent } from './comment/comment.component';
const firebaseConfig = {
  apiKey: "AIzaSyB-9o0Gby0ZcMLTVfeRmvc7wJymskESvkk",
  authDomain: "thought-5545e.firebaseapp.com",
  projectId: "thought-5545e",
  storageBucket: "thought-5545e.appspot.com",
  messagingSenderId: "722788183365",
  appId: "1:722788183365:web:67fb655a4beff1309ae22c",
  measurementId: "G-VET6FM6VCT"
};


firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    MyFeedComponent,
    CapitalizePipe,
    PostComponent,
    CreatePostComponent,
    ViewComponent,
    ProfileComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
