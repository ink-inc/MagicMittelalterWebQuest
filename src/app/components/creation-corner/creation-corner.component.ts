import {Component, OnInit} from '@angular/core';
import {CharacterCreationService} from '../../services/character-creation.service';
import 'firebase/storage';
import * as prettyBytes from 'pretty-bytes';

import {faTimes} from '@fortawesome/free-solid-svg-icons/faTimes';
import {faFileImage} from '@fortawesome/free-solid-svg-icons/faFileImage';

export interface DialogueStateDataType {
  forename?: string;
  surname?: string;
  birthYear?: string;
  birthMonth?: string;
  birthDay?: string;
  deathYear?: string;
  deathMonth?: string;
  deathDay?: string;
  jobs?: string;
  appearance?: string;
  characteristics?: string;
  additionalInfo?: string;
  uid?: string;
}

@Component({
  selector: 'app-creation-corner',
  templateUrl: './creation-corner.component.html',
  styleUrls: ['./creation-corner.component.scss']
})
export class CreationCornerComponent implements OnInit {

  faTimes = faTimes;

  charCreationData: DialogueStateDataType;
  fileImage = faFileImage;
  fileName = 'Kein Bild ausgewählt';
  fileSize = '0';

  avatar = '';
  profilePic: File;

  constructor(
    public charCreation: CharacterCreationService,
    ) {
  }

  ngOnInit(): void {
    this.charCreation.characterDialogueState.subscribe(state => {
      this.charCreationData = state.data;
      this.avatar = state.avatar;
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
    if (!!this.profilePic) {
      this.charCreation.editCharacter(uid, fields, this.profilePic);
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

  endCharacterEditing() {
    this.charCreationData = undefined;
    this.avatar = '';
  }

}
