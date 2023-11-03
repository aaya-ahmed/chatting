import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.scss']
})
export class LoginComponent {
  submitted:boolean=false;
  loading:boolean=false;
  responceMessage:string='';
  loginform:FormGroup=new FormGroup({
    email:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required])
  });

  constructor(private AuthService:AuthService,private userservice:UserService,private router:Router) { }

  get emailControl(){
    return this.loginform.controls['email'];
  }
  get passwordControl(){
    return this.loginform.controls['password'];
  }
  login(){
    this.submitted=true;
    if(this.loginform.valid){
      this.loading=true;
      this.AuthService.login(this.loginform.value).then(
        responce=>{
            this.submitted=false;
            this.loading=false;
            this.router.navigate(['/chats'])
        },
        error=>{
          this.loading=false;
          this.responceMessage="invalid email/password";
        },
      );
    }
  }

}
