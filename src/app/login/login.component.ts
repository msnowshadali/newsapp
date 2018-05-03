import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { config } from '../../config/config';
import { gapi } from '../../../src/platform.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private AuthService:AuthService) {  }
  
checkIfSignedIn(){
  if(localStorage.getItem("userId")){
    window.location.href="/dashboard"
  }
}

userImage:string = localStorage.getItem('userImage') ? localStorage.getItem('userImage') : null ;
userName:string = localStorage.getItem('userName') ? localStorage.getItem('userName') : null ;
  
initClient(){
  let self = this;
  function onSuccess(user : any) {
    localStorage.setItem("userId", user.getBasicProfile().getId());
    localStorage.setItem("userName", user.getBasicProfile().getName());
    localStorage.setItem("userGivenName", user.getBasicProfile().getGivenName());
    localStorage.setItem("userFamilyName", user.getBasicProfile().getFamilyName());
    localStorage.setItem("userImage", user.getBasicProfile().getImageUrl());
    localStorage.setItem("userEmailId", user.getBasicProfile().getEmail());
    console.log('Signed in as ' + user.getBasicProfile().getId());
    console.log('Signed in as ' + user.getBasicProfile().getName());
    console.log('Signed in as ' + user.getBasicProfile().getGivenName());
    console.log('Signed in as ' + user.getBasicProfile().getFamilyName());
    console.log('Signed in as ' + user.getBasicProfile().getImageUrl());
    console.log('Signed in as ' + user.getBasicProfile().getEmail());
    self.checkIfSignedIn();
  };
  
  function onFailure(error : any) {
    console.log(error);
  };

    gapi.load('auth2', function(){
        let auth2: any= gapi.auth2.init({
            client_id: config.googleAuthApiKey+'.apps.googleusercontent.com'
        });
        auth2.attachClickHandler('signin-button', {}, onSuccess, onFailure);
    });
}

ngOnInit(){
  this.initClient();
  this.checkIfSignedIn();
}

}
