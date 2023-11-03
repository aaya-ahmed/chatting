import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFireDatabase} from '@angular/fire/compat/database'
import { loginUser, registeruser, user } from '../data/user';
import { ImagesService } from './images.service';
import { AccountService } from './account.service';
import { UserService } from './user.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firebaseauth:AngularFireAuth,private router:Router,private accountService:AccountService,private userservice:UserService,private imageService:ImagesService,private db:AngularFireDatabase) { }
  
  public register(registeruser:registeruser){
    return new Promise((resolve,reject)=>{
      this.firebaseauth.createUserWithEmailAndPassword(registeruser.email,registeruser.password).then(
        async(responce)=>{
          if(registeruser.photo!=null) 
          await this.imageService.setImage(registeruser.photo);
          let user:user={
            firstName:registeruser.firstName,
            lastName:registeruser.lastName,
            email:registeruser.email,
            lastSeen:"",
            photo:registeruser.photo!=null?`users/${registeruser.photo?.name.substring(registeruser.photo?.name.lastIndexOf('\\')+1)}`:''
          }
          await this.accountService.AddAccount(user,responce.user?.uid||'');
          resolve(responce);
        },
        error=>{
          reject(error);
        }
      );
    }
    );
  }
  public async login(user:loginUser){
    return await this.firebaseauth.signInWithEmailAndPassword(user.email,user.password).then(
      res=>{
        this.settoken(res.user)
        this.userservice.setUser(res.user?.uid||'');
      }
    )
  }
  private async settoken(user:any){
    await user.getIdToken().then(
      (responce:any)=>{
        localStorage.setItem('chattingtoken',responce);
      }
    );
  }

  public forgetpassword(email:string){
    return this.firebaseauth.sendPasswordResetEmail(email);
  }
  public resetpassword(code:string,password:string){
    return this.firebaseauth.confirmPasswordReset(code,password)
  }
  public logout(){
    localStorage.clear()
    this.router.navigate(['/auth/login'])
  }
}
