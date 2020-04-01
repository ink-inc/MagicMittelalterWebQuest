import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import UserCredential = firebase.auth.UserCredential;
import {AuthService} from '../../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import {Character} from '../overview/overview.component';
import {animate, style, transition, trigger} from '@angular/animations';
import {error} from 'selenium-webdriver';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0, boxShadow: '0 2px 6px rgba(0,0,0,0)', transform: 'scale(.7, .7) translate(-50%, -50%)' }),
            animate('.3s ease-out',
              style({ opacity: 1, boxShadow: '0 2px 6px rgba(0,0,0,0.3)', transform: 'scale(1, 1) translate(-50%, -50%)' }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 1, boxShadow: '0 2px 6px rgba(0,0,0,0.3)', transform: 'scale(1, 1) translate(-50%, -50%)' }),
            animate('.3s ease-out',
              style({ opacity: 0, boxShadow: '0 2px 6px rgba(0,0,0,0)', transform: 'scale(.7, .7) translate(-50%, -50%)' }))
          ]
        )
      ]
    )
  ]
})
export class AuthComponent implements OnInit, AfterViewInit {

  user: UserCredential;
  keys: any;
  showRegister = false;
  private itemsCollection: any;

  constructor(
    public auth: AngularFireAuth,
    private authService: AuthService,
    private afs: AngularFirestore,
  ) {
    this.keys = afs.collection('Register Keys').valueChanges();
  }

  login(email, password) {
    this.auth.signInWithEmailAndPassword(email, password).then( res => {
      this.authService.logIn(res);
      this.showRegister = false;
    });
  }

  logout() {
    this.auth.signOut();
    this.authService.logOut();
  }

  toggleRegister() {
    this.showRegister = !this.showRegister;
  }

  public async register(email, password, key) {
    let logged = false;
    if (!email.value || !password.value || !key.value) {
      !email.value ? email.classList.add('error') : email.classList.remove('error');
      !password.value ? password.classList.add('error') : password.classList.remove('error');
      !key.value ? key.classList.add('error') : key.classList.remove('error');
      throw new Error('Did not provide sufficient information.');
    }
    this.keys.subscribe(keyChain => {
      for (const dataKey of keyChain) {
        if (dataKey.key === key.value) {
          this.auth.createUserWithEmailAndPassword(email.value, password.value).then( res => {
            this.authService.logIn(res);
            this.afs.collection<Character>('Register Keys', ref => ref.where('key', '==', key.value))
              .snapshotChanges().subscribe(results => {
              for (const result of results) {
                result?.payload.doc.ref.delete().catch(err => console.log(err));
              }
            });
            this.showRegister = false;
            logged = true;
          }).catch(err => console.log(err));
          return;
        }
      }
      key.classList.add('error');
      throw new Error('Could not register; Wrong register-key');
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    document.getElementById('login-form').addEventListener('submit', event => {
      event.preventDefault();
    }, false);
  }

}
