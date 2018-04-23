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
    this.user = this.AuthService.getFirstUser();
    console.log(this.user);
  }
}
