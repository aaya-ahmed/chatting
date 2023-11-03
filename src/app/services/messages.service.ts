import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';
import { message } from '../data/message';
import { FriendsService } from './friends.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  constructor(private db:AngularFireDatabase,private friendservice:FriendsService) { }
  public getmessages(chatid:string):Observable<any>{
    return this.db.list(`/messageUser/${chatid}`).valueChanges().pipe(map((items)=>{
        return items.map((item:any)=>{return item})
      })
    )
  }
  public async sendFirstMessage(friendid:string,message:message){
    return await this.friendservice.addFriend(friendid).then(async res=>{
      let mess=await this.db.list(`/messageUser/${res}`).push(message)
      return {chat:res,messgae:mess.key}
    })

  }
  public async sendMessage(chat:string,message:message){
    return await this.db.list(`/messageUser/${chat}`).push(message)
  }
  public updateChat(){}
  public deleteAccount(){}
}
