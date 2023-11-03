import { Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { friend } from '../data/friend';

@Injectable({
  providedIn: 'root'
})
export class CurrentchatService {
  chat:ReplaySubject<{chat:any,open:boolean,type:string,firstchat:boolean}>=new ReplaySubject(1);
  constructor() { }
  openChat(chat:any,open:boolean,type:string,firstchat:boolean){
    this.chat.next({chat:chat,open:open,type:type,firstchat:firstchat})
  }
}
