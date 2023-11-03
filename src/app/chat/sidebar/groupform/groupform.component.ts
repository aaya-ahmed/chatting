import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { imagecontroller } from 'src/app/controller/image';
import { friend } from 'src/app/data/friend';
import { ChatService } from 'src/app/services/chat.service';
import { CurrentchatService } from 'src/app/services/currentchat.service';
import { FriendsService } from 'src/app/services/friends.service';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-groupform',
  templateUrl: './groupform.component.html',
  styleUrls: ['./groupform.component.scss']
})
export class GroupformComponent implements OnInit {
  friends:friend[]=[]
  filter:friend[]=[]
  groupform:FormGroup=new FormGroup({
    photo:new FormControl(''),
    name:new FormControl('',[Validators.required]),
    users:new FormControl([],[Validators.minLength(1)])
  });
  step:number=1
  subscriber:Subscription=new Subscription();
  imagecontroller:imagecontroller=new imagecontroller()
  image:string='../../../../assets/groupchat.jpg'
  submitted:boolean=false;
  @Output()currentview:EventEmitter<string>=new EventEmitter()
  get groupusers(){
    return this.groupform.controls['users'].value;
  }
  constructor(private friendsService:FriendsService,private groupchatService:ChatService,private imageservice:ImagesService) { }
  ngOnInit(): void {
    this.subscriber=this.friendsService.getFriends().subscribe({
      next:(friendRes:any)=>{
        console.log(friendRes)
        this.friends=friendRes;
        this.filter=[...friendRes]
      }
    });
  }
  setPhoto(event:any){
    if(event.target.files.length>0){
      this.groupform.controls['photo'].setValue(event.target.files[0])
      this.imagecontroller.getBase64(event.target.files[0]).then(
        responce=>{
          this.image=responce
        }
      )
    }
  }
  addtogroup(event:number){
    let friend=this.filter[event]
    this.friends.splice(this.friends.findIndex(p=>p.email==friend.email),1)
    this.filter.splice(event,1)
    this.groupusers.push(friend)
  }
  getfriend($event:any){
    if($event.target.value!=''){
      this.filter=[]
      this.friends.forEach(ele=>{
        if(`${ele.firstName} ${ele.lastName}`.includes($event.target.value)){
        this.filter.push(ele)
        }
      })
    }
    else{
      this.filter=[...this.friends]
    }
  }
  gonextstep(){
    this.step++
  }
  gobackstep(){
    this.step--;
    if(this.step==0){
      this.currentview.emit('friendList')
    }
  }
  creategroup(){
    if(this.groupform.valid){
      this.submitted=true
      if(this.groupform.value.photo)
      this.imageservice.setImage(this.groupform.value.photo,'group')
      let group:any={
        photo:`group/${this.groupform.value.photo?.name?.substring(this.groupform.value.photo?.name?.lastIndexOf('\\')+1)}`||'',
        users:[],
        name:this.groupform.value.name
      }
      this.groupusers.forEach((item:any) => {
        group.users.push(item.friendId)
      });
      this.groupchatService.addgroup(group).then(res=>{
        this.submitted=false
        this.currentview.emit('friendList')
      })
    }
  }
}
