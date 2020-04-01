import { Component, OnInit } from '@angular/core';
import {CharacterCreationService} from '../../services/character-creation.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {faTimes} from '@fortawesome/free-solid-svg-icons/faTimes';

@Component({
  selector: 'app-character-creation',
  templateUrl: './character-creation.component.html',
  styleUrls: ['./character-creation.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0, boxShadow: '0 0 0 rgba(0,0,0,0)', transform: 'scale(.7, .7) translate(-50%, -50%)' }),
            animate('.3s ease-out',
              style({ opacity: 1, boxShadow: '0 2px 6px rgba(0,0,0,0.3)', transform: 'scale(1, 1) translate(-50%, -50%)' }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 1, boxShadow: '0 2px 6px rgba(0,0,0,0.3)', transform: 'scale(1, 1) translate(-50%, -50%)' }),
            animate('.3s ease-out',
              style({ opacity: 0, boxShadow: '0 0 0 rgba(0,0,0,0)', transform: 'scale(.7, .7) translate(-50%, -50%)' }))
          ]
        )
      ]
    )
  ]
})
export class CharacterCreationComponent implements OnInit {

  isHidden = true;
  closeTimes = faTimes;

  constructor(
    private charCreation: CharacterCreationService
  ) {
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

  toggleCharCreation() {
    this.isHidden = !this.isHidden;
  }
}
