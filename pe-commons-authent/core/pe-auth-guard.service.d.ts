import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PeAuthService } from './pe-auth.service';
import { Observable } from 'rxjs';
import { PeInterceptService } from './pe-intercept.service';
import * as ɵngcc0 from '@angular/core';
export declare class PeAuthGuardService implements CanActivate {
    private router;
    private peAuthService;
    private peInterceptService;
    constructor(router: Router, peAuthService: PeAuthService, peInterceptService: PeInterceptService);
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<PeAuthGuardService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDeclaration<PeAuthGuardService>;
}

//# sourceMappingURL=pe-auth-guard.service.d.ts.map