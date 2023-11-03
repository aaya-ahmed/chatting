import { Component, OnInit } from '@angular/core';
import { CurrentchatService } from 'src/app/services/currentchat.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  toggleSidebarFlag:boolean=false;
  currentMessage:string='';
  chatexist:boolean=false
  constructor(private currentchat:CurrentchatService) { }
  ngOnInit(): void {
    this.currentchat.chat.subscribe(res=>{this.chatexist=res.open})
  }
  togglesidebar(event:any){
    this.toggleSidebarFlag=event;
  }
}
