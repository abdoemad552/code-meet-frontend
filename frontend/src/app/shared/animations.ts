import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [   // when element appears
    style({ opacity: 0 }),
    animate('300ms ease-in', style({ opacity: 1 }))
  ]),
  transition(':leave', [   // when element disappears
    animate('300ms ease-out', style({ opacity: 0 }))
  ])
]);

export const rotate = trigger('rotateAnimation', [
  state('void', style({ transform: 'rotate(0deg)' })),
  transition('* => *', animate('1.5s linear', keyframes([
    style({ transform: 'rotate(0deg)', offset: 0 }),
    style({ transform: 'rotate(360deg)', offset: 1.0 })
  ])))
]);
