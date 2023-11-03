import { Route, RouterModule } from "@angular/router";
import { DefaultComponent } from "./default/default.component";
import { NgModule } from "@angular/core";

const router:Route[]=[
    {path:'',component:DefaultComponent}
]
@NgModule(
{
    imports:[
        RouterModule.forChild(router)
    ],
    exports:[RouterModule]
}
)
export class chatRoutingModule{}