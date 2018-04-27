export class Utils {

  constructor() {
      console.log("constructor");
  }

  checkIfSignedIn() {
      if (!localStorage.getItem("userId")) {
          window.location.href = "/login";
      }
  }

  logout(self) {
      var session;
      session = gapi.auth2.getAuthInstance();
      session.signOut().then(function() {
            var myImage = localStorage.getItem('userImage');
            localStorage.clear();
            localStorage.setItem('userImage',myImage);
          self.s.checkIfSignedIn();
      });
  }
}