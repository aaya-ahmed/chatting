import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { UserService } from './user.service';
import { combineLatest, map, mergeMap } from 'rxjs';
import { friend } from '../data/friend';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(private firebaseauth:AngularFireAuth,private userService:UserService,private db:AngularFireDatabase) { }
  public getFriends(){
    let userId=JSON.parse(localStorage.getItem('chattinguser')||'').user;
    return this.db.list(`/friends/${userId}`).snapshotChanges().pipe(mergeMap(items=>{
      return combineLatest(
        items.map(async(item:any)=>{
          let user={}
          await this.userService.getUser(item.key).then(res=>{user=res.val()})
          return {...user,chat:item.payload.val().chatid,block:item.payload.val().block,friendId:item.payload.key}
        })
      )}
    ));
  }
  public getFriend(friendid:string){
    let userId=JSON.parse(localStorage.getItem('chattinguser')||'').user;
    return this.db.object(`/friends/${friendid}/${userId}`).query.once('value')
  }
  public isFriend(friendId:string){
    let userId=JSON.parse(localStorage.getItem('chattinguser')||'').user;
    return this.db.object(`/friends/${userId}/${friendId}`).query.once('value')
  }
  public async addFriend(friendid:string){
    let userId=JSON.parse(localStorage.getItem('chattinguser')||'').user;
    let chat=''
    await this.userService.getUser(friendid).then(async userres=>{
      await this.db.list('/chat').push({lastmessage:''}).then(res=>{
        this.db.list(`/friends/${userId}/${userres.key}`).set('chatid',res.key);
        this.db.list(`/friends/${userres.key}/${userId}`).set('chatid',res.key);
        chat=res.key||''
      })
    })
    return chat
  }
  public blockFriend(friendId:string){
    let userId=JSON.parse(localStorage.getItem('chattinguser')||'').user;
    return this.db.list(`/friends/${userId}/${friendId}`).set('block',true);
  }
  unBlockFriend(friendId:string){
    let userId=JSON.parse(localStorage.getItem('chattinguser')||'').user;
    return this.db.list(`/friends/${userId}/${friendId}`).set('block',false);
  }
    // this.db.list(`/friends/${userId}`).set(friendId,{chatid:''});
    // let friend:any={
    //   chat: '',
    //   friendId: friendId
    // }
    // return this.db.list('/chat').push({lastmessage:''}).then(res=>{
    //     friend.chat=res.key+''
    //     this.db.list(`/friends/${userId}`).push(friend);
    //     return this.db.list(`/friends/${friend.friendId}`).push({chat:friend.chat,friendId: userId});
    // })
  public updateFriends(): void{}
  public deleteAccount(){}
}
