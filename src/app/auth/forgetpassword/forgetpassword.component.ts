import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['../auth.scss']
})
export class ForgetpasswordComponent implements OnInit {
  forgetpasswordform:FormGroup=new FormGroup({
    email:new FormControl('',[Validators.required])
  });
  constructor(private authservice:AuthService) { }

  ngOnInit(): void {
  }
  sendemail(){
    if(this.forgetpasswordform.valid){
      this.authservice.forgetpassword(this.forgetpasswordform.controls['email'].value)
    }
  }
}
