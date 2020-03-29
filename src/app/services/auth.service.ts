import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {first} from 'rxjs/operators';
import {User} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;

  constructor(
    private afa: AngularFireAuth
  ) {
    this.afa.currentUser.then(user => {
      return user;
    }).catch(e => console.log(e));
  }

  logIn(user): void {
    this.user = user;
    console.log(this.user);
  }
  logOut(): void {
    delete this.user;
    console.log(this.user);
  }
  isLoggedIn(): Promise<User | null> {
    return this.afa.authState.pipe(first()).toPromise();
  }
}
