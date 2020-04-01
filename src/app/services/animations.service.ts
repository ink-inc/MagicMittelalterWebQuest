import { Injectable } from '@angular/core';
import {animate, animation, style, transition, trigger} from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class AnimationsService {
}

export const fadeScaleAnimation = animation([
  trigger(
    'fadeScale',
    [
      transition(
        ':enter',
        [
          style({ opacity: 0, boxShadow: '0 2px 6px rgba(0,0,0,0)', transform: 'scale(.7, .7) translate(-50%, -50%)' }),
          animate('.3s ease-out',
            style({ opacity: 1, boxShadow: '0 2px 6px rgba(0,0,0,0.3)', transform: 'scale(1, 1) translate(-50%, -50%)' }))
        ]
      ),
      transition(
        ':leave',
        [
          style({ opacity: 1, boxShadow: '0 2px 6px rgba(0,0,0,0.3)', transform: 'scale(1, 1) translate(-50%, -50%)' }),
          animate('.3s ease-out',
            style({ opacity: 0, boxShadow: '0 2px 6px rgba(0,0,0,0)', transform: 'scale(.7, .7) translate(-50%, -50%)' }))
        ]
      )
    ]
  )
]);
