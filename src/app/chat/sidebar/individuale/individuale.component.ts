import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { friend } from 'src/app/data/friend';
import { user } from 'src/app/data/user';
import { CurrentchatService } from 'src/app/services/currentchat.service';
import { FriendsService } from 'src/app/services/friends.service';
import { ImagesService } from 'src/app/services/images.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-individuale',
  templateUrl: './individuale.component.html',
  styleUrls: ['./individuale.component.scss']
})
export class IndividualeComponent implements OnInit {
  friends:friend[]=[];
  @Input()makinggroup:boolean=false
  subscriber:Subscription=new Subscription();
  constructor(private friendsService:FriendsService,private currentChatService:CurrentchatService) { }
  ngOnInit(): void {
    this.subscriber=this.friendsService.getFriends().subscribe({
      next:(friendRes:any)=>{
        this.friends=friendRes;
      }
    });
  }
  openchat(item:friend){
    this.currentChatService.openChat(item,true,'one',false)
  }


}
