declare function require(name: string);

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CharacterCreationService {

  constructor() {
  }

  private checkFields(): boolean {
    const fields: any = document.getElementsByClassName('input');
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
    if (failing) {
      return false;
    }
    return fields;
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

  createCharacter() {
    const fields: any = this.checkFields();
    if (!fields) {
      throw new TypeError('Can\'t create character!');
    }
    let values = {uid: this.makeid()};
    for (const field of fields) {
      values[field.name] = field.value;
    }
    console.log(values);
    const jsonValues = JSON.stringify(values);
    const fs = require('fs');
    fs.writeFile('../data/characters/characters.json', jsonValues, err => console.log(err));
    const characterFile = require('../data/characters/characters.json');
    characterFile[values.uid] = values;
    console.log(characterFile);
  }
}
