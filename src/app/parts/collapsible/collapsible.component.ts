import {Component, Input, OnInit} from '@angular/core';
import {faEdit} from '@fortawesome/free-regular-svg-icons/faEdit';
import {faTrash} from '@fortawesome/free-solid-svg-icons/faTrash';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import 'firebase/firestore';
import {CharacterCreationService} from '../../services/character-creation.service';
import {Character} from '../../components/character-list/character-list.component';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-collapsible',
  templateUrl: './collapsible.component.html',
  styleUrls: ['./collapsible.component.scss'],
})
export class CollapsibleComponent implements OnInit {

  @Input() item;

  faEdit = faEdit;
  faTrash = faTrash;
  confirmDelete = false;
  private itemsCollection: AngularFirestoreCollection<Character>;
  char;
  avatar = '/assets/loader.gif';
  imageState = 'loading';
  // TODO shove the loading-thingy into it's own component

  constructor(
    private readonly afs: AngularFirestore,
    private afsg: AngularFireStorage,
    private charCreationService: CharacterCreationService
  ) {
    this.itemsCollection = afs.collection<Character>('Characters');
  }

  ngOnInit(): void {
    if (this.item.hasImage) {
      this.afsg.ref(this.item.uid).getDownloadURL().subscribe(
        res => {
          this.avatar = res;
          this.imageState = 'loaded';
        },
        err => {
          this.avatar = '/assets/times-solid.svg';
          this.imageState = 'failed';
        }
      );
    } else {
      this.imageState = 'failed';
      this.avatar = '/assets/times-solid.svg';
    }
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
    console.log(this.avatar);
    this.charCreationService.toggleCharacterDialogue(this.avatar, item);
  }

  deleteItem(uid: string, buttonRef) {
    if (this.confirmDelete) {
      this.charCreationService.deleteCharacter(uid);
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
