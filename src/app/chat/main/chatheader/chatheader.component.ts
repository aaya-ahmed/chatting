import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { loginUser, registeruser, user } from 'src/app/data/user';
import { ChatService } from 'src/app/services/chat.service';
import { CurrentchatService } from 'src/app/services/currentchat.service';
import { FriendsService } from 'src/app/services/friends.service';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-chatheader',
  templateUrl: './chatheader.component.html',
  styleUrls: ['./chatheader.component.scss']
})
export class ChatheaderComponent implements OnInit,OnChanges {
  @Input()currentchat:any
  @Input()type:string=''
  toggle:boolean=false;
  toggleSidebarFlag:boolean=false;
  @Output()toggleSidebarEvent:EventEmitter<boolean>=new EventEmitter<boolean>();
  constructor(private currentchatservice:CurrentchatService,private chatservice:ChatService,private friendservice:FriendsService) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.currentchat)
    console.log(this.type)
  }
  ngOnInit(): void {
  }
  changeToggleStatus(){
    this.toggle=!this.toggle;
  }
  togglesidebar(){
    this.toggleSidebarFlag=!this.toggleSidebarFlag;
    this.toggleSidebarEvent.emit(this.toggleSidebarFlag);
  }
  closechat(){
    this.currentchatservice.openChat('',false,'',false)
  }
  blockchat(){
    this.friendservice.blockFriend(this.currentchat.friendId).then(res=>{})
    this.currentchat.block=true
    this.changeToggleStatus()
  }
  unblockchat(){
    this.friendservice.unBlockFriend(this.currentchat.friendId)
    this.currentchat.block=false
    this.changeToggleStatus()
  }
  leavegroup(){
    let key=this.currentchat.users.findIndex((p:any)=>{return (p==JSON.parse(localStorage.getItem('chattinguser')||'').user)});
    if(JSON.parse(localStorage.getItem('chattinguser')||'').user==this.currentchat.admin&&this.currentchat.users.length>=2){
      this.chatservice.setadmingroup(this.currentchat.chatid,this.currentchat.users[0])
    }
    else if(this.currentchat.users.length==1){
      this.chatservice.removegroup(this.currentchat.chatid)
    }
    this.chatservice.leavegroup(this.currentchat.chatid,key).then(
      res=>{
        this.currentchatservice.openChat('',false,'',false)
      }
    )
  }
}
