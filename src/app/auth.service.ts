import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  login(email:string,password:string){
    return firebase.auth().signInWithEmailAndPassword(email,password);
  }
  logout(){
    firebase.auth().signOut();
  }
  signup(email:string,password:string,firstname:string,lastname:string){
    return new Promise((resolve, reject)=>{
      firebase.auth().createUserWithEmailAndPassword(email,password).then((response)=>{
        let d=Math.floor(Math.random()*1000);
        response.user?.updateProfile({
          displayName:firstname+' '+lastname,
          photoURL:"https://robohash.org/"+d
        }).then(()=>{
          resolve(response.user);
        }).catch((err)=>{
          reject(err);
        })
      }).catch((err)=>{
        reject(err);
      })
    })
  }

  
}
