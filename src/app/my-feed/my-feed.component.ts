import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
@Component({
  selector: 'app-my-feed',
  templateUrl: './my-feed.component.html',
  styleUrls: ['./my-feed.component.css']
})
export class MyFeedComponent implements OnInit {
  @Output('initializeUser') initializeUser=new EventEmitter();
  user:any;
  image:any;
  name:string="";
  posts:any=[];
  constructor() { 
    this.user=firebase.auth().currentUser;
    this.image=this.user.photoURL;
    this.name=this.user.displayName;
    this.initializeUser.emit();
    this.getPosts();
  }

  getPosts(){
    firebase.firestore().collection('posts').orderBy('date','desc').limit(100).get().then((snapShot)=>{
      this.posts=snapShot.docs;
    }).catch((err)=>{
      console.log(err);
    })
  }

  newPostAdded(){
    this.posts=[];
    this.getPosts();
  }

  ngOnInit(): void {
    this.initializeUser.emit();
  }

}
