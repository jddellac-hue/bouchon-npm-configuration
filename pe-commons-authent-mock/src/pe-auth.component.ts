import { Component, Input } from '@angular/core';

@Component({
  selector: 'pe-auth',
  template: '<ng-content></ng-content>',
})
export class PeAuthComponent {
  @Input() type: string = '';
  @Input() mode: string = '';
  @Input() defaultRoute: string[] = [];
  @Input() errorRoute: string[] = [];
  @Input() onConnect: any;
}
