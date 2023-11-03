import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { friend } from 'src/app/data/friend';
import { user } from 'src/app/data/user';
import { ChatService } from 'src/app/services/chat.service';
import { CurrentchatService } from 'src/app/services/currentchat.service';
import { FriendsService } from 'src/app/services/friends.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-searching',
  templateUrl: './searching.component.html',
  styleUrls: ['./searching.component.scss']
})
export class SearchingComponent implements OnInit {
  email:string='';
  users:{key:string,value:user}[]=[]
  loadingstate:boolean=false;
  searchtext:Subject<any>=new Subject()
  constructor(private userService:UserService,private currentchatservice:CurrentchatService,private friendservice:FriendsService) { }
  ngOnInit(): void {
    this.searchtext.pipe(debounceTime(500)).subscribe(
      res=>{
        this.search()
      }
    )
  }
  search(){
    this.users=[]
    if(this.email!=''){
      this.loadingstate=true
      this.userService.getUsers(this.email).subscribe({
        next:(res:any)=>{
          this.users=res
          this.loadingstate=false
        }
      });
    }
  }
  openchat(user:{key:string,value:user}){
    this.friendservice.isFriend(user.key).then(
      (res:any)=>{
        this.email='';
        this.users=[];
        if(res.val()){
          this.currentchatservice.openChat(res.val(),true,'one',false)
        }
        else{
          let newfriend:friend={
            ...user.value,
            photo:user.value.photo||'',
            friendId: user.key,
            chat: '',
            block:false
          }
          this.currentchatservice.openChat(newfriend,true,'one',true)
        }
      }
    )
  }
}
