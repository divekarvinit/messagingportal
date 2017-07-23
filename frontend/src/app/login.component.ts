import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
    moduleId : module.id,
    selector: 'login',
    templateUrl: 'login.component.html',
})
export class LoginComponent  {
  
    constructor(private authService : AuthService, private router : Router){}

    loginData = {
      email : "",
      password : ""
    }

    login(){
        this.authService.login(this.loginData);
        console.log(this.loginData);
        this.router.navigate(['/']);
    }
}
