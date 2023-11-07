import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";
import { authGuard } from "src/guard/auth.guard";
const routes: Routes =[
    {
    path:'',
    redirectTo:'auth',
    pathMatch:"full"
    },
    {
        path:'auth',
        loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule),canActivate:[authGuard]
    },
    {
        path:'chats',
        loadChildren:()=>import('./chat/chat.module').then(m=>m.ChatModule)
    }
];
@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{}
