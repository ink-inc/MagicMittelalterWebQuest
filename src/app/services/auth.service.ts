import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;

  constructor() { }

  logIn(user): void {
    this.user = user;
    console.log(this.user);
  }
  logOut(): void {
    delete this.user;
    console.log(this.user);
  }
  isLoggedIn(): boolean {
    return this.user;
  }
}
