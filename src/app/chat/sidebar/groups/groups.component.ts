import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { CurrentchatService } from 'src/app/services/currentchat.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
groups:any[]=[]
  constructor(private chatservice:ChatService,private currentChatService:CurrentchatService) { }

  ngOnInit(): void {
    this.chatservice.getusergroups().then(
      res=>{
        res.subscribe(res=>{
          this.groups=res
          console.log(res)
      })
    })
  }
  openchat(item:any){
    this.currentChatService.openChat(item,true,'group',false)
  }
}
