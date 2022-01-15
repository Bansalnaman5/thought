import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import 'firebase/firestore';
import firebase from 'firebase/app';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  signUpForm: FormGroup;
  message: string = '';
  date:Date=new Date();
  constructor(public fb: FormBuilder, public authservice: AuthService,public router:Router) {
    this.signUpForm = this.fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmpassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      {
        validators: this.checkPass('password', 'confirmpassword'),
      }
    );
  }
  checkPass(pass1key: string, pass2key: string) {
    return (grp: FormGroup) => {
      let p1 = grp.controls[pass1key];
      let p2 = grp.controls[pass2key];
      if (p1.value != p2.value) {
        p2.setErrors({
          notEqual: true,
        });
      } else {
        return;
      }
    };
  }

  onSignup(signupForm: any) {
    let v = signupForm.value;
    this.authservice
      .signup(v.email, v.password, v.firstName, v.lastName)
      .then((user:any) => {
        firebase.firestore().collection("users").doc(user.uid).set({
          firstname:v.firstName,
          lastname:v.lastName,
          bio:"",
          email:v.email,
          interests:"",
          photo:user.photoURL,
          dateCreated:this.date
        }).then(()=>{
          this.message = 'Welcome ,Logging you in !!';
          this.router.navigate(['/myFeed']);
        })
      })
      .catch((err) => {
        console.log(err);
        this.message = err.message;
      });
  }

  ngOnInit(): void {}
}
