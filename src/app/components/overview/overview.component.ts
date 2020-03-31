import { Component, OnInit } from '@angular/core';
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
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  private itemsCollection: AngularFirestoreCollection<Character>;
  items: Observable<Character[]>;

  constructor(private readonly afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Character>('Characters', ref => ref.limit(3));
    this.items = this.itemsCollection.valueChanges();
  }

  ngOnInit(): void {
  }

}
