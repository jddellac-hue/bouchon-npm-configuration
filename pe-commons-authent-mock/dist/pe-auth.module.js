import { NgModule } from '@angular/core';
import { PeAuthComponent } from './pe-auth.component';
import * as i0 from "@angular/core";
export class PeAuthModule {
    static forRoot(_options) {
        return { ngModule: PeAuthModule, providers: [] };
    }
}
PeAuthModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: PeAuthModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PeAuthModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.10", ngImport: i0, type: PeAuthModule, declarations: [PeAuthComponent], exports: [PeAuthComponent] });
PeAuthModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: PeAuthModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: PeAuthModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [PeAuthComponent],
                    exports: [PeAuthComponent],
                }]
        }] });
