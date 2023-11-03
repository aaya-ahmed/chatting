import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { message } from 'src/app/data/message';
import { CurrentchatService } from 'src/app/services/currentchat.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnChanges
 {
  @Input()chat:string=''
  @Input()type:string=''
  @Input()message:message={
    message: '',
    sender: '',
    status: false,
    type: ''
  };
  Messages:any[]=[];
  messageSender:string=JSON.parse(localStorage.getItem('chattinguser')||'').email;
  constructor(private messagesService:MessagesService) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.Messages=[]
      if(changes['chat']?.currentValue!=''){
        let _subscriber=this.messagesService.getmessages(this.chat).subscribe(res=>{
          this.Messages=res;
        });
      }
  }
}
