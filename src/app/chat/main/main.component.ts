import { Component } from '@angular/core';
import { friend } from 'src/app/data/friend';
import { group } from 'src/app/data/group';
import { message } from 'src/app/data/message';
import { CurrentchatService } from 'src/app/services/currentchat.service';
import { FriendsService } from 'src/app/services/friends.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  toggleSidebarFlag:boolean=false;
  currentFriend:friend={
    chat: '',
    friendId: '',
    photo: '',
    firstName: '',
    lastName: '',
    email: '',
    lastSeen: '',
    block:false
  }
  currentGroup:group={
    admin: '',
    name: '',
    photo: '',
    users: [],
    chatid: '',
    block:false
  }
  currentmessage:message={
    message: '',
    sender: '',
    status: false,
    type: ''
  }
  type:string=''
  constructor(private currentchat:CurrentchatService,private friendservice:FriendsService) { }
  ngOnInit(): void {
    this.currentchat.chat.subscribe(res=>{
      if(res.open){
        this.type=res.type
        console.log(res.chat)
        if(res.type=='one'){
          this.currentFriend=res.chat
        }
        if(res.type=='group'){
          this.currentGroup=res.chat
        }
      }
  })
  }
  togglesidebar(event:any){
    this.toggleSidebarFlag=event;
  }
  setcurrentmessage(message:message){
    this.currentmessage=message
  }
  setnewchat(chat:string){
    this.currentFriend.chat=chat
  }
}
