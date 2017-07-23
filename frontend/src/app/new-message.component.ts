import { Component } from '@angular/core';
import { WebService } from './web.service';
import { AuthService } from './auth.service';

@Component({
    selector : 'new-message',
    template : `
    <md-card class= "card">
        <md-card-content>
            <md-input-container>
                <textarea [(ngModel)]=message.text mdInput placeholder = "Message"></textarea>
            </md-input-container>
            <md-card-actions>
                <button (click)="post()" md-button color="primary">POST</button>
            </md-card-actions>
        </md-card-content>
    </md-card>`
})
export class NewMessageComponent {
    constructor(private webService : WebService, private authService : AuthService){

    }

    message = {
        owner : this.authService.name,
        text : ""
    }

    post(){
        var response = this.webService.postMessage(this.message);
    }
}