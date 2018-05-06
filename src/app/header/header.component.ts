import { Component, OnInit } from '@angular/core';
import { Utils } from '../common';
import { config } from '../../config/config';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  s = new Utils();
  userName:String;
  userImage:String;
  constructor() { }

  ngOnInit() {
    this.userName = localStorage.getItem("userName");
    this.userImage = localStorage.getItem("userImage");
    this.s.checkIfSignedIn();
      gapi.load('auth2', function(){
        let auth2 = gapi.auth2.init({
            client_id: config.googleAuthApiKey+'.apps.googleusercontent.com'
        });
      });
  }

  logout() {
    this.s.logout(this);
  }

}
