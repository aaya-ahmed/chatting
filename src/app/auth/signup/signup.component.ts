import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {imagecontroller} from '../../controller/image'
import { registeruser } from 'src/app/data/user';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../auth.scss','./signup.component.scss']
})
export class SignupComponent implements OnInit {
  submitted:boolean=false;
  loading:boolean=false;
  responcemessage:string='';
  userImage:File=new File([''],'');
  @ViewChild('image',{static:true})image:ElementRef={} as ElementRef;
  registerform:FormGroup=new FormGroup({
    photo:new FormControl('',[]),
    firstName:new FormControl('',[Validators.required,Validators.pattern('^[a-z A-Z]{3,10}$')]),
    lastName:new FormControl('',[Validators.required,Validators.pattern('^[a-z A-Z]{3,10}$')]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.pattern('^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[# @ * & ^]).{8,}$')]),
    verifcationcode:new FormControl('',[Validators.required,Validators.pattern('^[0-9]{4}$')])
  });
  imagecontroller:imagecontroller=new imagecontroller()
  get firstNameControl(){
    return this.registerform.controls['firstName'];
  }
  get lastNameControl(){
    return this.registerform.controls['lastName'];
  }
  get emailControl(){
    return this.registerform.controls['email'];
  }
  get passwordControl(){
    return this.registerform.controls['password'];
  }
  get verifcationcodeControl(){
    return this.registerform.controls['verifcationcode'];
  }
  constructor(private AuthService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
  setPhoto(event:any){
    if(event.target.files.length>0){
      this.imagecontroller.getBase64(event.target.files[0]).then(
        responce=>{
          this.userImage=event.target.files[0];
          this.image.nativeElement.src=responce
        }
      )
    }
  }
  register(){
    this.submitted=true;
    if(this.registerform.valid){
      this.loading=true;
      let user:registeruser={
        ...this.registerform.value,
        photo: this.userImage
      }
      this.AuthService.register(user).then(
        responce=>{
          this.loading=false;
          this.router.navigate(['/auth/login']);
        },
        error=>{
          this.loading=false;
          this.responcemessage=error
        }
      );
    }
  }
}
