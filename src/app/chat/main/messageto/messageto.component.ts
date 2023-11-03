import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { message } from 'src/app/data/message';
import { ChatService } from 'src/app/services/chat.service';
import { CurrentchatService } from 'src/app/services/currentchat.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-messageto',
  templateUrl: './messageto.component.html',
  styleUrls: ['./messageto.component.scss']
})
export class MessagetoComponent {
  constructor(private messagesService:MessagesService,private chatservice:ChatService) { }
  @Input()chat:string=''
  @Input()currentFriend:string=''
  @Input()type:string=''
  @Output()Message:EventEmitter<message>=new EventEmitter();
  @Output()newchat:EventEmitter<string>=new EventEmitter();

  currentMessage:message={
    sender: JSON.parse(localStorage.getItem('chattinguser') || '').email,
    message: '',
    status: false,
    type: 'text'
  }
  sendMessage(message:any){
    if(message.innerHTML!=''){
      this.currentMessage.message=(message.innerHTML).toString().replace(/<br>/g,'\n').replace(/&nbsp;/g,' ');
      message.innerHTML='';
    if(this.type=='one'){
        if(this.chat!=''){
          this.messagesService.sendMessage(this.chat,this.currentMessage).then((res:any)=>
            this.chatservice.updateChat(this.chat,res.key)
          )
          this.Message.emit(this.currentMessage)
        }
       else{
        this.sendfirsttime()
       }
    }
    else if(this.type=='group'){
      console.log(this.chat)
      console.log(this.currentMessage)
      this.messagesService.sendMessage(this.chat,this.currentMessage)
    }
    }
  }
  sendfirsttime(){
    this.messagesService.sendFirstMessage(this.currentFriend,this.currentMessage).then((res:any)=>{
      this.chatservice.updateChat(res.chat,res.messgae)
      this.newchat.emit(res.chat)
    }
      )
  }
  j(event:any){
    if (event.keyCode == 13 && event.shiftKey == false) {
      event.preventDefault(); 
      document.execCommand("insertLineBreak");    
    } 
  }
}
