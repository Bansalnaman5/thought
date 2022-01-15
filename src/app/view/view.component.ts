import { Component, OnInit } from '@angular/core';
import 'firebase/firestore';
import firebase from 'firebase/app';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  posts:any=[];
  postID:any="";
  currpost:any={};
  userid:string="";
  useremail:string="";
  comments:any=[];
  constructor(public activateroute:ActivatedRoute) { 
    this.postID=this.activateroute.snapshot.paramMap.get('id');
    this.getPost();

  }

  getPost(){
    firebase.firestore().collection('posts').doc(this.postID).get().then((snapshot)=>{
      this.currpost=snapshot.data();
      this.userid=this.currpost.ownerid;
      // console.log(this.currpost.comments);
      this.comments=this.currpost.comments;
      this.getUserPosts(this.currpost.ownerid);
      
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  getUserPosts(userid:string){
    firebase.firestore().collection('posts').where("ownerid",'==',userid).get().then((snap)=>{
      this.posts=snap.docs;
      this.posts=this.posts.filter((obj:any)=> obj.id!=this.postID);
    })
  }
  

  ngOnInit(): void {
  }

}
