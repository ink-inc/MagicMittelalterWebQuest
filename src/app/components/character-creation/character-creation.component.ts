import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {CharacterCreationService} from '../../services/character-creation.service';

@Component({
  selector: 'app-character-creation',
  templateUrl: './character-creation.component.html',
  styleUrls: ['./character-creation.component.scss']
})
export class CharacterCreationComponent implements OnInit {

  loggedIn;

  constructor(
    private auth: AuthService,
    private charCreation: CharacterCreationService
  ) {
    this.auth.isLoggedIn().then(res => {
      this.loggedIn = res;
    });
  }

  ngOnInit(): void {
  }

  create(...fields) {
    const arr = [];
    for (const field of fields) {
      arr.push(field);
    }
    if (!this.charCreation.checkFields(arr)) {
      return;
    }
    this.charCreation.createCharacter(arr);
  }

}
