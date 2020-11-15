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
  template: `<lib-com></lib-com>`,
})
export class OtherPageComponent {
}
