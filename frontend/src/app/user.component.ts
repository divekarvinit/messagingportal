import { Component } from '@angular/core';
import { WebService } from './web.service';

@Component({
    selector : 'updateUser',
    template : `
        <md-card class="card">
            <md-card-content>
                <md-input-container>
                    <input mdInput [(ngModel)]="model.firstName" type = "text" placeholder="First Name">
                </md-input-container>
                <md-input-container>
                    <input mdInput [(ngModel)]="model.lastName" type = "text" placeholder="Last Name">
                </md-input-container>
                <md-card-actions>
                    <button md-raised-button color = "primary" (click)="updateUser()">Update</button>
                </md-card-actions>
            </md-card-content>
        </md-card>
    `
})
export class UserComponent {
    model = {
        firstName : "",
        lastName : ""
    };
    constructor(private webService : WebService){

    }

    ngOnInit(){
        this.webService.getUser().subscribe(res => {
            console.log(res.user.firstName);
            console.log(res.user.lastName);
            this.model.firstName = res.user.firstName;
            this.model.lastName = res.user.lastName;
        });
    }

    updateUser(){
        this.webService.updateUser(this.model).subscribe();
        
    }
}