import { Http } from '@angular/http'; 
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Subject } from 'rxjs/Rx';
import { AuthService } from './auth.service';

@Injectable()
export class WebService {
    baseUrl = 'http://localhost:63145/api';

    private messageStore = [];
    private messageSubject = new Subject();
    messages = this.messageSubject.asObservable();

    user = '';
    constructor (private http : Http, private sb : MdSnackBar, private authService : AuthService) {
        this.getMessages(this.user);
    }
    getMessages(user){
        user = (user) ? '/' + user : '';
        this.http.get(this.baseUrl + '/messages' + user).subscribe(response => {
            this.messageStore = response.json();
            this.messageSubject.next(this.messageStore);
        }, error => {
            this.handleError("Unable to Connect !");
        });
    }

    async postMessage(message){
        try {
            var response = await this.http.post(this.baseUrl + '/messages', message).toPromise();
            this.messageStore.push(response.json());
            this.messageSubject.next(this.messageStore);    
        } catch (error) {
            this.handleError("Cannot Connect!");
        }
        
    }

    getUser(){
        return this.http.get(this.baseUrl + '/users/me', this.authService.tokenHeader).map(res => res.json());
    }

    updateUser(userData){
        return this.http.post(this.baseUrl + '/users/me', userData, this.authService.tokenHeader).map(res => res.json());
    }

    private handleError(errorMessage){
        console.error(errorMessage);
        this.sb.open(errorMessage, 'Close', {duration : 5000});
    }
}