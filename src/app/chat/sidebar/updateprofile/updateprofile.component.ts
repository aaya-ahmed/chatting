import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { ImagesService } from 'src/app/services/images.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.scss']
})
export class UpdateprofileComponent implements OnInit {
  user:FormGroup=new FormGroup({
    photo:new FormControl(),
    firstName:new FormControl('',[]),
    lastName:new FormControl('',[]),
    password:new FormControl('',[])
  })
  imagename:string=''
  @Output()currentview:EventEmitter<string>=new EventEmitter()
  get photo(){
    return this.user.controls['photo']
  }
  get firstName(){
    return this.user.controls['firstName']
  }
  get lastName(){
    return this.user.controls['lastName']
  }
  get password(){
    return this.user.controls['password']
  }
  image:string=''
  constructor(private authservice:AuthService,private userservice:UserService,private imageservice:ImagesService){}
  ngOnInit(): void {
    this.user.patchValue({
      ...this.userservice.getCurrentUser()
    })
    this.photo.setValue(environment.firebase.userImageURL+(this.photo.value).split('/')[1]+'?alt=media');
    this.image=this.user.value.photo
  }
  gobackstep(){
    this.currentview.emit('friendList')
  }
  changephoto(event:any){
    if(event.target.files[0]){
      this.imageservice.setImage(event.target.files[0])
      this.userservice.updateUser({photo:`users/${event.target.files[0].name.substring(event.target.files[0].name.lastIndexOf('\\')+1)}`}).then(
        res=>{
          this.userservice.setUser(this.userservice.getCurrentUser().user)
          this.imagename=event.target.files[0].name
          let file=new FileReader()
          file.readAsDataURL(event.target.files[0])
          file.onload=()=>{
            this.image=file.result||this.user.value.photo
          }
        }
      )
    }
  }
  update(){
    if(this.user.valid){
      this.userservice.updateUser({
      firstName:this.user.value.firstName,
      lastName:this.user.value.lastName}).then(res=>{
        if(this.user.value.password){
          this.authservice.updatepassword(this.user.value.password)
          this.gobackstep()
        }
      }  
      )
    }
  }
}
