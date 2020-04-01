import {Component, Input, OnInit} from '@angular/core';
import {faEdit} from '@fortawesome/free-regular-svg-icons/faEdit';
import {faTrash} from '@fortawesome/free-solid-svg-icons/faTrash';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Character} from '../../components/overview/overview.component';
import 'firebase/firestore';

@Component({
  selector: 'app-collapsible',
  templateUrl: './collapsible.component.html',
  styleUrls: ['./collapsible.component.scss']
})
export class CollapsibleComponent implements OnInit {

  @Input() item;

  faEdit = faEdit;
  faTrash = faTrash;
  confirmDelete = false;
  private itemsCollection: AngularFirestoreCollection<Character>;
  char;

  constructor(
    private readonly afs: AngularFirestore,
  ) {
    this.itemsCollection = afs.collection<Character>('Characters');
  }

  ngOnInit(): void {
  }

  toggleBody(el) {
    if (el.classList.contains('collapsed')) {
      el.style.height = (el.scrollHeight + 20) + 'px';
      el.classList.remove('collapsed');
      return;
    }
    el.style.height = 0;
    el.classList.add('collapsed');
  }

  editItem(item) {
    return this.afs.collection<Character>('Characters', el => el.where('uid', '==', item.uid))
      .snapshotChanges();
  }

  deleteItem(uid: string, buttonRef) {
    if (this.confirmDelete) {
      this.char = this.afs.collection<Character>('Characters', ref => ref.where('uid', '==', uid))
        .snapshotChanges()
        .subscribe(res => {
        if (res.length > 1) {
          throw new Error('Could not determine unique character. UIDs colliding!');
        }
        res[0].payload?.doc.ref.delete();
      });
      return;
    }
    buttonRef.classList.add('confirm');
    buttonRef.style.transitionDuration = '.1s';
    buttonRef.style.transform = 'translateX(20%)';
    setTimeout(() => { buttonRef.style.transform = 'translateX(-10%)'; }, 40);
    setTimeout(() => { buttonRef.style.transform = 'translateX(8%)'; }, 80);
    setTimeout(() => { buttonRef.style.transform = 'translateX(-6%)'; }, 130);
    setTimeout(() => { buttonRef.style.transform = 'translateX(4%)'; }, 190);
    setTimeout(() => { buttonRef.style.transform = 'translateX(-2%)'; }, 260);
    setTimeout(() => { buttonRef.style.transform = 'translateX(1%)'; }, 330);
    setTimeout(() => { buttonRef.style.transform = 'translateX(0)'; }, 400);
    this.confirmDelete = true;
  }
}
