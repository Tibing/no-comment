import { Component } from '@angular/core';

@Component({
  selector: 'app-other-page',
  styles: [`
    :host {
      display: block;
      width: 600px;
      margin: auto;
    }
  `],
  template: `<nc-no-comment></nc-no-comment>`,
})
export class OtherPageComponent {
}
