import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['../auth.scss']
})
export class ResetpasswordComponent implements OnInit {
  password=new FormControl('',[Validators.required,Validators.pattern('^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[# @ * & ^]).{8,}$')]);
  code:string=''
  submitted:boolean=false;
  constructor(private authservice:AuthService,private router:ActivatedRoute,private route:Router) { }
  ngOnInit(): void {
    this.code=this.router.snapshot.queryParamMap.get('oobCode')||''
  }
  resetpassword(){
    if(this.password.valid&&this.code!=''){
      this.submitted=true
      this.authservice.resetpassword(this.code,this.password.value||'').then(
        res=>{
          this.route.navigate(['/auth/login'])
        }
      )
    }
  }

}
