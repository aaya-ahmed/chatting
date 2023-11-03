import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { user } from '../data/user';
import { ImagesService } from './images.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private path='accounts';
  constructor(private db:AngularFireDatabase,private imageService:ImagesService) { }
  public async AddAccount(registeruser:user,id:string){
    await this.db.list(`accounts/`).set(id,registeruser);
  }
  public getAccount(id:string){
   return this.db.object(`${this.path}/${id}`).query.once('value')
  }
  public updateUser(){}
  public deleteAccount(){}
}
