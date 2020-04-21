import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {BehaviorSubject} from 'rxjs';
import {Character} from '../components/character-list/character-list.component';
import {AngularFireStorage} from '@angular/fire/storage';
import {$PERCENT} from 'codelyzer/angular/styles/chars';

export interface DialogueStateType {
  state: boolean;
  avatar: string;
  data: {
    hasImage?: boolean;
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
  characterDialogueState = new BehaviorSubject<DialogueStateType>({state: this.characterDialogueOpen, avatar: undefined, data: undefined});

  constructor(
    private afs: AngularFirestore,
    private afsg: AngularFireStorage
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

  toggleCharacterDialogue(avatarUrl?, data?: object) {
    console.log(avatarUrl);
    this.characterDialogueState.next({ state: !this.characterDialogueOpen, avatar: avatarUrl, data });
    this.characterDialogueOpen = !this.characterDialogueOpen;
  }

  async editCharacter(uid, fields, newAvatar?) {
    await this.afs.collection<Character>('Characters', ref => ref.where('uid', '==', uid))
      .snapshotChanges()
      .subscribe(res => {
        if (res.length > 1) {
          throw new Error('Could not determine unique character. UIDs colliding!');
        }
        const values = {};
        for (const field of fields) {
          values[field.name] = field.value;
        }
        if (!!newAvatar) {
          this.afsg.upload(uid, newAvatar);
          // @ts-ignore
          values.hasImage = true;
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
        if (res.length !== 0) {
          res[0].payload?.doc.ref.delete();
        }
      });
    this.afsg.ref(uid).delete();
  }

  createCharacter(profilePic, fields) {
    if (!fields) {
      throw new TypeError('Can\'t create character, unsufficient fields.');
    }
    const charCollection = this.afs.collection('Characters');
    const values = {uid: this.makeid()};
    for (const field of fields) {
      values[field.name] = field.value;
    }
    if (profilePic) {
      this.afsg.upload(values.uid, profilePic);
      // @ts-ignore
      values.hasImage = true;
    }
    charCollection.add(values);
  }
}
