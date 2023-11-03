import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-imageuser',
  templateUrl: './imageuser.component.html',
  styleUrls: ['./imageuser.component.scss']
})
export class ImageuserComponent implements OnChanges {
  @Input()url:string|undefined;
  @Input()type:string|undefined;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if(!this.url)
    this.url="../../../../../assets/userphoto.svg"
    else{
      if(changes['url'].currentValue!=undefined){
        if(this.type=='group')
          this.url=`${environment.firebase.groupImageURL}${this.url.split("/")[1]}?alt=media`
        else
          this.url=`${environment.firebase.userImageURL}${this.url.split("/")[1]}?alt=media`
      }
    }
  }
}
