import { Component, OnInit,Input } from '@angular/core';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import firebase from 'firebase/app';
import 'firebase/firestore';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input('post') post:any;
  postData:any={}
  user:any={};
  likeArr:any=[];
  likelen:number=0;
  comment:string="";
  commentArr:any=[];
  commentlen:number=0;
  today:Date=new Date();
  showComment:string="none";
  t:string="translateY(-20vh)"
  constructor() {
    this.user=firebase.auth().currentUser;
   }
   sleep(milliseconds:number) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  like(){
    console.log(this.likeArr);
    if(this.likeArr.find((userid:string) => userid==this.user.uid)){
      this.likeArr=this.likeArr.filter((s:string)=>s!=this.user.uid)
    }
    else{
      this.likeArr.push(this.user.uid);
    }
    firebase.firestore().collection("posts").doc(this.post.id).update({
      likes:this.likeArr
    }).then(()=>{
      this.likelen=this.likeArr.length
    })
  }
  postComment(){
    this.commentArr.push({
      image:this.user.photoURL,
      name:this.user.displayName,
      date:this.today,
      comment:this.comment,
      id:this.user.uid
    })
    firebase.firestore().collection("posts").doc(this.post.id).update({
      comments:this.commentArr
    }).then(()=>{
      this.comment="";
      this.commentlen+=1;
    })
  }
  showcomment():any{
    
    if(this.showComment=='none'){
      this.t=" translateY(0) ";
      // this.sleep(1000);
      this.showComment='';
      
    }
    else if(this.showComment==''){
      this.t="translateY(-20vh) ";
      // this.sleep(1000);
      this.showComment='none';
    }
  }
  ngOnInit(){
    this.postData=this.post.data();
    this.likeArr=this.postData.likes;
    this.likelen=this.likeArr.length;
    this.commentArr=this.postData.comments;
    this.commentlen=this.commentArr.length;
  }

}
