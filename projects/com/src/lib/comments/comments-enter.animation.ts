import { animate, AnimationTriggerMetadata, query, stagger, style, transition, trigger } from '@angular/animations';

export const commentsEnter: AnimationTriggerMetadata = trigger('stagger', [
  transition(
    '* <=> *',
    [
      query(
        ':enter',
        [
          style({ opacity: 0, transform: 'translateY(-15px)' }),
          stagger(
            '50ms',
            animate(
              '550ms ease-out',
              style({ opacity: 1, transform: 'translateY(0px)' }),
            ),
          ),
        ],
        { optional: true },
      ),
    ],
  ),
]);
