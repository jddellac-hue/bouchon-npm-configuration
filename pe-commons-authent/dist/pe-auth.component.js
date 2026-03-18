import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class PeAuthComponent {
    constructor() {
        this.type = '';
        this.mode = '';
        this.defaultRoute = [];
        this.errorRoute = [];
    }
}
PeAuthComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: PeAuthComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
PeAuthComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: PeAuthComponent, selector: "pe-auth", inputs: { type: "type", mode: "mode", defaultRoute: "defaultRoute", errorRoute: "errorRoute", onConnect: "onConnect" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: PeAuthComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'pe-auth',
                    template: '<ng-content></ng-content>',
                }]
        }], propDecorators: { type: [{
                type: Input
            }], mode: [{
                type: Input
            }], defaultRoute: [{
                type: Input
            }], errorRoute: [{
                type: Input
            }], onConnect: [{
                type: Input
            }] } });
