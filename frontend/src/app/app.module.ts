import { NgModule }      from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { WebService } from './web.service';
import { AuthService } from './auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import 'hammerjs';

import { AppComponent }  from './app.component';
import { LoginComponent } from './login.component';
import { MessageComponent } from './message.component';
import { NewMessageComponent } from './new-message.component';
import { NavComponent } from './nav.component';
import { HomeComponent } from './home.component';
import { RegisterComponent } from './register.component';
import { UserComponent } from './user.component';

var routes = [{
  path : '',
  component : HomeComponent
},
{
  path : 'messages',
  component : MessageComponent
},
{
  path : 'messages/:name',
  component : MessageComponent
},
{
  path : 'register',
  component : RegisterComponent
},{
  path : 'login',
  component : LoginComponent
},{
  path : 'updateUser',
  component : UserComponent
}];

@NgModule({
  imports:      [ BrowserModule, 
                  MaterialModule, 
                  HttpModule, 
                  BrowserAnimationsModule, 
                  MdButtonModule, 
                  MdCardModule, 
                  MdMenuModule, 
                  MdToolbarModule, 
                  MdIconModule, 
                  MdInputModule, 
                  FormsModule,
                  ReactiveFormsModule, 
                  RouterModule.forRoot(routes) 
                  ],
  declarations: [ AppComponent, MessageComponent, NewMessageComponent, NavComponent, HomeComponent, RegisterComponent, LoginComponent, UserComponent ],
  bootstrap:    [ AppComponent ],
  providers :   [ WebService, AuthService ]
})
export class AppModule { }