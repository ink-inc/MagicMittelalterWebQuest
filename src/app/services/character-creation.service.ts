import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {BehaviorSubject} from 'rxjs';
import {Character} from '../components/character-list/character-list.component';

export interface DialogueStateType {
  state: boolean;
  data: {
    forename?: string;
    surname?: string;
    age?: string;
    job?: string;
    appearance?: string;
    characteristics?: string;
    uid?: string
  };
}

@Injectable({
  providedIn: 'root'
})

export class CharacterCreationService {

  fields: any;
  characterDialogueOpen = false;
  characterDialogueState = new BehaviorSubject<DialogueStateType>({state: this.characterDialogueOpen, data: undefined});

  constructor(
    private afs: AngularFirestore
  ) {}

  checkFields(fields): boolean {
    this.fields = fields;
    let failing = false;
    for (const field of fields) {
      if (field.classList.contains('required') && field.value === '') {
        field.classList.add('error');
        failing = true;
      } else {
        field.classList.remove('error');
      }
    }
    return !failing;
  }

  makeid(length = 16) {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  toggleCharacterDialogue(data?: object) {
    this.characterDialogueState.next({ state: !this.characterDialogueOpen, data });
    this.characterDialogueOpen = !this.characterDialogueOpen;
  }

  editCharacter(uid, fields) {
    this.afs.collection<Character>('Characters', ref => ref.where('uid', '==', uid))
      .snapshotChanges()
      .subscribe(res => {
        if (res.length > 1) {
          throw new Error('Could not determine unique character. UIDs colliding!');
        }
        const values = {};
        for (const field of fields) {
          values[field.name] = field.value;
        }
        res[0].payload?.doc.ref.update(values).then();
      });
  }

  deleteCharacter(uid) {
    this.afs.collection<Character>('Characters', ref => ref.where('uid', '==', uid))
      .snapshotChanges()
      .subscribe(res => {
        if (res.length > 1) {
          throw new Error('Could not determine unique character. UIDs colliding!');
        }
        res[0].payload?.doc.ref.delete();
      });
  }

  createCharacter(fields) {
    if (!fields) {
      throw new TypeError('Can\'t create character!');
    }
    const charCollection = this.afs.collection('Characters');
    const values = {uid: this.makeid()};
    for (const field of fields) {
      values[field.name] = field.value;
    }
    charCollection.add(values);
  }
}
