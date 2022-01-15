import { Component, OnInit,Input } from '@angular/core';
import {FormGroup,FormBuilder,Validator, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import firebase from 'firebase/app';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  loginForm:FormGroup;
  loginm:string='Login';
  user:any={};
  name:any;
  image:any;
  isdisabled:boolean=false;
  checkuser:any;
  constructor(public fb:FormBuilder,public authservice:AuthService,public router:Router) { 
    this.loginForm=this.fb.group({
      email:['',[Validators.email,Validators.required]],
      password:['',[Validators.required,Validators.minLength(8)]]
    });
    this.initializeUser();    
  }
  initializeUser(){
    this.user=firebase.auth().currentUser;
  }
  login(loginForm:any){
    let v=loginForm.value;
    console.log(v);
    this.authservice.login(v.email,v.password).then((response)=>{
      console.log(response)
      this.loginm="Successfully signed Up. Logging you in !!";
      this.user=firebase.auth().currentUser;
      this.name=this.user.displayName;
      this.image=this.user.photoURL;
      this.router.navigate(['/myFeed']);
      loginForm.reset();
    }).catch((err)=>{
      console.log(err);
      this.loginm="Incorrect Email or Password";
    });
  }
  logout(){
    this.authservice.logout();
    this.user=null;
    this.loginm="Login";
  }
  checkRoute(){
    this.user=firebase.auth().currentUser;
    if(this.user){
      this.router.navigate(['/myFeed']);
      this.name=this.user.displayName;
      this.image=this.user.photoURL;
    }
    else{
      console.log("not authorized")
    }
  }
  navhome(){
    this.router.navigate(['/welcome']);
  }

  ngOnInit(): void {
    this.initializeUser();
  }

}
