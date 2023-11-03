import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  image:string=''
  toggle:boolean=false;
  @Output()currentview:EventEmitter<string>=new EventEmitter()
  constructor(private authservice:AuthService) { }
  ngOnInit(): void {
    this.image=JSON.parse(localStorage.getItem('chattinguser')||'').photo
  }
  changeToggleStatus(){
    this.toggle=!this.toggle;
  }
  firecurrentview(view:string){
    this.currentview.emit(view)
  }
  logout(){
    this.authservice.logout()

  }
}
