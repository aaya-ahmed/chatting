import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './sidebar/header/header.component';
import { GroupsComponent } from './sidebar/groups/groups.component';
import { IndividualeComponent } from './sidebar/individuale/individuale.component';
import { DefaultComponent } from './default/default.component';
import { chatRoutingModule } from './chat.RoutingModule';
import { ChatheaderComponent } from './main/chatheader/chatheader.component';
import { MessagetoComponent } from './main/messageto/messageto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageuserComponent } from './sidebar/individuale/imageuser/imageuser.component';
import { SearchingComponent } from './sidebar/searching/searching.component';
import { MainComponent } from './main/main.component';
import { MessagesComponent } from './main/messages/messages.component';
import { SenderComponent } from './main/messages/sender/sender.component';
import { ReceiverComponent } from './main/messages/receiver/receiver.component';
import { GroupformComponent } from './sidebar/groupform/groupform.component';
import { UpdateprofileComponent } from './sidebar/updateprofile/updateprofile.component';



@NgModule({
  declarations: [
    IndividualeComponent,
    GroupsComponent,
    SidebarComponent,
    HeaderComponent,
    DefaultComponent,
    ChatheaderComponent,
    MessagesComponent,
    MessagetoComponent,
    SenderComponent,
    ReceiverComponent,
    ImageuserComponent,
    SearchingComponent,
    MainComponent,
    GroupformComponent,
    UpdateprofileComponent
  ],
  imports: [
    CommonModule,
    chatRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class ChatModule { }
