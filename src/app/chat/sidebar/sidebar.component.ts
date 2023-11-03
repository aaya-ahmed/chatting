import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input()toggleSidebarFlag:boolean=false;
  listToggle:boolean=true;
  currentview:string='friendList'
  constructor() { }

  ngOnInit(): void {
  }
  getFriendsList(){
    this.listToggle=true;
  }
  getGroupList(){
    this.listToggle=false;
  }
  setview(event:string){
    this.currentview=event
  }
}
