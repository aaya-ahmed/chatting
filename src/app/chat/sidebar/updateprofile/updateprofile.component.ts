import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
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
  constructor(private userservice:UserService){}
  ngOnInit(): void {
    this.user.patchValue({
      ...this.userservice.getCurrentUser()
    })
    this.photo.setValue(environment.firebase.userImageURL+(this.photo.value).split('/')[1]+'?alt=media');
  }
  gobackstep(){
    this.currentview.emit('friendList')
  }
}
