import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { user } from '../data/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private path='accounts';
  constructor(private db:AngularFireDatabase) { }
  public getUser(id:string){
   return this.db.object(`${this.path}/${id}`).query.once('value')
  }
  getUsers(email:string){
    return this.db.list(`${this.path}`,ref=>ref.orderByChild('email').startAt(email).endAt(email+'\uf8ff')).snapshotChanges().pipe(
      map( items=>{
        return items.map(item=>{
          return{key:item.payload.key,value:item.payload.val()}
        })
      })
    )
  }
  getUserbyemail(email:string){
    return this.db.list(`${this.path}`,ref=>ref.orderByChild('email').equalTo(email)).snapshotChanges().pipe(
      map( items=>{
        return items.map(item=>{
          return item.payload.key
        })
      })
    )
  }
  async setUser(id:string){
    await this.getUser(id).then(
      res=>{
        localStorage.setItem('chattinguser',JSON.stringify({...res.val(),user:id}))
      }
    )
  }
  public getCurrentUser(){
    return JSON.parse(localStorage.getItem('chattinguser')||'')
  }
  public updateUser(user:any){
    return this.db.object(`${this.path}/${this.getCurrentUser().user}`).update(user)
  }

  public deleteAccount(){}
}
