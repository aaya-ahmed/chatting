import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { NgModule } from "@angular/core";
import { ForgetpasswordComponent } from "./forgetpassword/forgetpassword.component";
import { ResetpasswordComponent } from "./resetpassword/resetpassword.component";

const routes:Routes=[
    {path:'',redirectTo:'login',pathMatch:"full"},
    {path:'login',component:LoginComponent},
    {path:'forgetpassword',component:ForgetpasswordComponent},
    {path:'resetpassword',component:ResetpasswordComponent},
    {path:'signup',component:SignupComponent}
]
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class AuthRoutingModule{}