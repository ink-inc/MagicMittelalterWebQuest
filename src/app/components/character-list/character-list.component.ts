import {Component, Input, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import 'firebase/firestore';

export interface Character {
  uid: string;
  forename: string;
  surname: string;
  age: string;
  jobs: string;
  appearance: string;
  characteristics: string; }

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {

  @Input() take = 10;

  private itemsCollection: AngularFirestoreCollection<Character>;
  items: Observable<Character[]>;
  shown = true;

  constructor(private readonly afs: AngularFirestore) {
  }

  ngOnInit(): void {
    this.itemsCollection = this.afs.collection<Character>('Characters', ref => ref.limit(this.take));
    this.items = this.itemsCollection.valueChanges();
  }

  check() {
    console.log('checked');
  }
}
