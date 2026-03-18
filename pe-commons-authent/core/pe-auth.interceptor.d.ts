import { Injector } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { PeAuthGuardService } from "./pe-auth-guard.service";
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import * as ɵngcc0 from '@angular/core';
export declare class PeAuthInterceptor implements HttpInterceptor {
    private injector;
    private router;
    private peAuthGuardService;
    private connexionInProgress;
    private waitingToken;
    private peAuthService;
    constructor(injector: Injector, router: Router, peAuthGuardService: PeAuthGuardService);
    private addRequestHeader(request);
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<PeAuthInterceptor, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDeclaration<PeAuthInterceptor>;
}

//# sourceMappingURL=pe-auth.interceptor.d.ts.map