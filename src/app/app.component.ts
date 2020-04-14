import { Component } from '@angular/core';
import {AuthService} from './services/auth.service';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons/faSignInAlt';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  loggedIn;
  signInAlt = faSignInAlt;

  constructor(
    private auth: AuthService,
    public fireAuth: AngularFireAuth,
  ) {
    this.auth.isLoggedIn().then(res => {
      this.loggedIn = res;
    });
  }

}
