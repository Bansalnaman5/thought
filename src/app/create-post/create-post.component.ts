import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import {FormBuilder,FormGroup,Validator, Validators} from '@angular/forms';
import firebase from 'firebase/app';
import 'firebase/firestore';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  @Output('newPostAdded') newPostAdded=new EventEmitter;
  postForm:FormGroup;
  today:Date=new Date();
  user:any={};
  name:string="";
  image:any;
  constructor(public fb:FormBuilder) { 
    this.postForm=this.fb.group({
      interest:["",[Validators.required]],
      postdata:["",[Validators.required]],
      title:["",[Validators.required]]
    })
    this.user=firebase.auth().currentUser;
    this.name=this.user.displayName;
    this.image=this.user.photoURL;
  }
  onPost(postform:any){
    let v=postform.value;
    firebase.firestore().collection('posts').add({
      ownerid:this.user.uid,
      email:this.user.email,
      image:this.user.photoURL,
      date:this.today,
      postdata:v.postdata,
      title:v.title,
      interest:v.interest,
      name:this.user.displayName,
      comments:[],
      likes:[]
    }).then((data)=>{
      postform.reset();
      this.newPostAdded.emit();
    }).catch((err)=>{
      console.log(err)
    })
  }
  ngOnInit(): void {
  }

}
