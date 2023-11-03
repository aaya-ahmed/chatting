import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.scss']
})
export class SenderComponent implements OnInit {
  @Input()message:string='';

  constructor() { }

  ngOnInit(): void {
  }

}
