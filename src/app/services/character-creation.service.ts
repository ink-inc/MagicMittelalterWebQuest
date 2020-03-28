import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class CharacterCreationService {

  fields: any;

  constructor(
    private afs: AngularFirestore
  ) {}

  checkFields(fields): boolean {
    this.fields = fields;
    let failing = false;
    for (const field of fields) {
      if (field.classList.contains('required') && field.value === '') {
        field.classList.add('error');
        field.parentElement.classList.add('error');
        failing = true;
      } else {
        field.classList.remove('error');
        field.parentElement.classList.remove('error');
      }
    }
    return !failing;
  }

  private makeid(length = 16) {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  createCharacter(fields) {
    const charCollection = this.afs.collection('Characters');
    if (!fields) {
      throw new TypeError('Can\'t create character!');
    }
    const values = {uid: this.makeid()};
    for (const field of fields) {
      values[field.name] = field.value;
    }
    console.log(values);
    charCollection.add(values);
  }
}
