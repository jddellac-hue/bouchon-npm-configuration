import { ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PeAuthService } from './pe-auth.service';
import { Observable } from 'rxjs';
import { PeInterceptService } from './pe-intercept.service';
import * as ɵngcc0 from '@angular/core';
export declare class PeAuthComponent implements OnInit, OnDestroy {
    private router;
    private peAuthService;
    private peInterceptService;
    private element;
    type: string;
    mode: string;
    defaultRoute: any[];
    errorRoute: any[];
    maxRetryRoute: any[];
    onConnect: (token: string, refreshToken: boolean) => Observable<boolean> | Promise<boolean> | boolean;
    private _connect;
    private _secureRoute;
    constructor(router: Router, peAuthService: PeAuthService, peInterceptService: PeInterceptService, element: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<PeAuthComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDeclaration<PeAuthComponent, "pe-auth", never, { "type": "type"; "mode": "mode"; "defaultRoute": "defaultRoute"; "errorRoute": "errorRoute"; "maxRetryRoute": "maxRetryRoute"; "onConnect": "onConnect"; }, {}, never, never, false, never>;
}

//# sourceMappingURL=pe-auth.component.d.ts.map