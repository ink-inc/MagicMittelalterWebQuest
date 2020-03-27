import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import UserCredential = firebase.auth.UserCredential;
import {AuthService} from '../../services/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import 'firebase/firestore';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  user: UserCredential;
  keys: any;
  private itemsCollection: any;

  constructor(
    public auth: AngularFireAuth,
    private authService: AuthService,
    private afs: AngularFirestore
  ) {
    this.keys = afs.collection('Register Keys').valueChanges();
  }
  login(email, password) {
    this.auth.signInWithEmailAndPassword(email, password).then( res => {
      this.authService.logIn(res);
    });
  }
  logout() {
    this.auth.signOut();
    this.authService.logOut();
  }
  register(email, password, key) {
    this.keys.subscribe(keyChain => {
      for (const dataKey of keyChain) {
        if (dataKey.key === key) {
          this.auth.createUserWithEmailAndPassword(email, password).then( res => {
            this.authService.logIn(res);
          });
          return;
        }
      }
    });
    throw new TypeError('Could not register: wrong register-key');
  }

  ngOnInit(): void {
  }

}
