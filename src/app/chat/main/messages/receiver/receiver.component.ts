import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-receiver',
  templateUrl: './receiver.component.html',
  styleUrls: ['./receiver.component.scss']
})
export class ReceiverComponent implements OnInit {
  @Input()message:string='';

  constructor() { }

  ngOnInit(): void {
  }

}
