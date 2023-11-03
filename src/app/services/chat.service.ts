import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/compat/database';
import { Observable, combineLatest, map, mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private firebaseauth:AngularFireAuth,private db:AngularFireDatabase) { }
  public getChat():Observable<any>{
    let id=JSON.parse(localStorage.getItem("chattinguser")||'').user;
    return this.db.list <{ key: string, value: SnapshotAction<unknown>[] }[]>('/chat',ref=>ref.orderByChild('id').equalTo(id)).snapshotChanges().pipe(map((items)=>{
        return items.map(item=>{return {key:item.payload.key,value:item.payload.val()}})
      })
    )
  }
  public addChat(){
    return this.db.list('chat/').push({});
  }
  public updateChat(chatid:string,messagekey:string){
    return this.db.list(`chat/`).update(chatid,{lastmessage:messagekey})
  }
  public deleteAccount(){}
  public async addgroup(group:any){
    group.admin=JSON.parse(localStorage.getItem('chattinguser')||'').user;
    group.users.push(group.admin)
    return await this.db.list('groups/').push(group).then(res=>{
      group.users.forEach((item:any)=>{
        this.db.list(`accountgroups/${item}`).set(`${res.key}`,res.key)
      })
    })
  }
  removegroup(groupid:string){
    return this.db.list(`groups/${groupid}`).remove()

  }
  public async getusergroups(){
    let userid=JSON.parse(localStorage.getItem('chattinguser')||'').user;
    return this.db.list(`accountgroups/${userid}`).snapshotChanges().pipe(mergeMap(
      items=>{
        return combineLatest(items.map(
          (item:any)=>{
            return this.getgroup(item.payload.val())
          }
        ))
      }
    ))
  }
  setadmingroup(groupid:string,admin:string){
    return this.db.list(`groups/${groupid}`).set('admin',admin)
  }
  public async leavegroup(groupid:string,userkey:number){
    let userid=JSON.parse(localStorage.getItem('chattinguser')||'').user;
           this.db.list(`accountgroups/${userid}`).remove(groupid)
    return this.db.list(`groups/${groupid}/users/${userkey}`).remove()

  }
  public async getgroup(id:string){
  return await  this.db.list(`groups/${id}`).query.once('value').then(res=>{
    return {...res.val(),chatid:res.key}
  })
  }
}
