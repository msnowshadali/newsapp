import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }
  users:string[] = ['john','lilly'];

  getFirstUser(){
    //return window.profileId;
  }

  

}
