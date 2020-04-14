import {Component, OnInit} from '@angular/core';
import {CharacterCreationService} from '../../services/character-creation.service';
import {faFileImage} from '@fortawesome/free-solid-svg-icons/faFileImage';
import {AngularFireStorage} from '@angular/fire/storage';
import 'firebase/storage';
import * as prettyBytes from 'pretty-bytes';

export interface DialogueStateDataType {
  forename?: string;
  surname?: string;
  age?: string;
  jobs?: string;
  appearance?: string;
  characteristics?: string;
  uid?: string;
}

@Component({
  selector: 'app-creation-corner',
  templateUrl: './creation-corner.component.html',
  styleUrls: ['./creation-corner.component.scss']
})
export class CreationCornerComponent implements OnInit {

  isVisible = false;
  charCreationData: DialogueStateDataType;
  fileImage = faFileImage;
  fileName = 'Kein Bild ausgewählt';
  fileSize = '0';

  profilePic: File;

  constructor(
    public charCreation: CharacterCreationService,
    ) {
  }

  ngOnInit(): void {
    this.charCreation.characterDialogueState.subscribe(state => {
      this.isVisible = state.state;
      this.charCreationData = state.data;
    });
  }

  create(event, ...fields) {
    event.preventDefault();
    const arr = [];
    for (const field of fields) {
      arr.push(field);
    }
    if (!this.charCreation.checkFields(arr)) {
      return;
    }
    this.charCreation.createCharacter(this.profilePic, arr);
  }

  edit(event, uid, ...fields) {
    event.preventDefault();
    if (!this.charCreation.checkFields(fields)) {
      return;
    }
    this.charCreation.editCharacter(uid, fields);
  }

  clickUpload(uploadDialogue) {
    uploadDialogue.click();
  }

  fileUploadHandling(input: FileList) {
    this.profilePic = input.item(0);
    this.fileName = this.profilePic.name;
    this.fileSize = prettyBytes(this.profilePic.size);
  }

}
