import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService{
    baseUrl = "http://localhost:63145/auth";
    NAME_KEY = "name";
    TOKEN_KEY = "token"

    constructor(private http : Http, private router : Router){
 
    }

    get name() {
        return localStorage.getItem(this.NAME_KEY);
    }

    get isAuthenticated() {
        return !!localStorage.getItem(this.TOKEN_KEY);
    }

    get tokenHeader() {
        var header = new Headers({'Authorization' : 'Bearer ' + localStorage.getItem(this.TOKEN_KEY)});
        return new RequestOptions({headers : header});
    }
    
    login(loginData) {
        this.http.post(this.baseUrl + '/login', loginData).subscribe(res => {
            this.authenticate(res);
            console.log(res.json());
        });
    }

    register(user){
        delete user.confirmPassword;
        this.http.post(this.baseUrl + '/register', user).subscribe( res => {
            this.authenticate(res);
        });
    }

    authenticate(res){
        var authResponse = res.json();
        if(!authResponse.token)
            return;
        localStorage.setItem('token', authResponse.token);
        localStorage.setItem('name', authResponse.firstName);
        this.router.navigate(['/']);
    }
    logout() {
        localStorage.removeItem(this.NAME_KEY);
        localStorage.removeItem(this.TOKEN_KEY);
    }
}