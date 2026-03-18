import { EventEmitter } from '@angular/core';

export declare class PeAuthComponent {
  type: string;
  mode: string;
  defaultRoute: string[];
  errorRoute: string[];
  onConnect: (token: string, refreshToken: boolean) => any;
}
