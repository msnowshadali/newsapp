import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:string;
  constructor(private AuthService:AuthService) {
  }

  ngOnInit() {
    //this.user = this.AuthService.getFirstUser();
    console.log(this.user);
    initClient();
    checkIfSignedIn();
  }
  
function checkIfSignedIn() {
  if(localStorage.getItem("userId")){
    window.location.href="/dashboard"
  }
}

  
function initClient() {
  
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
    checkIfSignedIn();
  };
  
  function onFailure(error : any) {
    console.log(error);
  };

    gapi.load('auth2', function(){
        let auth2: any= gapi.auth2.init({
            client_id: '821905500436-di0qml19bemmcmfne1poegemgqf4dffh.apps.googleusercontent.com'
        });
        auth2.attachClickHandler('signin-button', {}, onSuccess, onFailure);
    });
};

}
