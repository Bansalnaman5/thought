import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/firestore';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userID:any;
  user:any={};
  currUser:any={};
  posts:any=[];
  wantEdit:boolean=false;
  bio:string="";
  interests:string="";
  constructor(public activateroute:ActivatedRoute) { 
    this.userID=this.activateroute.snapshot.paramMap.get('id');
    this.getUser(this.userID);
    this.currUser=firebase.auth().currentUser;
    this.getPosts(this.userID);

  }
  getPosts(id:string){
    
    firebase.firestore().collection("posts").where('ownerid','==',id).get().then((docsnap)=>{
      this.posts=docsnap.docs;
    })

  }
  getUser(id:string){
    // console.log(id);
    firebase.firestore().collection("users").doc(id).get().then((documentSnapshot)=>{
      this.user=documentSnapshot.data();
      this.bio=this.user.bio;
      this.interests=this.user.interests;
      if(this.bio.length==0){
        this.bio="No Bio updated."
      }
      if(this.interests.length==0){
        this.interests="No interests added."
      }
    })
  }
  edit(){
    this.wantEdit=true;
  }
  submitedit(){
    this.wantEdit=false;
    console.log("int : ",this.interests);
    console.log("bio : ",this.bio);
    firebase.firestore().collection("users").doc(this.userID).update({
      bio:this.bio,
      interests:this.interests
    }).then(()=>{

    })
  }
  ngOnInit(): void {
    // console.log(this.userID);
    // this.getUser(this.userID);
  }

}
