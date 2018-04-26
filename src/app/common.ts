export class Utils {

  constructor(){
    console.log("constructor");
  }
  
    checkIfSignedIn() {
        if(!localStorage.getItem("userId")){
          window.location.href="/login";
        }
      }
}