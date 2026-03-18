import { PeAuthType, KitSSOOptions } from '../declarations/index';
export declare class KitSSOType implements PeAuthType {
    ready: Promise<KitSSOType>;
    cxnUrl: string;
    autoReload: boolean;
    cookieName: string;
    private static readonly COOKIE_SUFFIXE;
    private _options;
    constructor(kitSSOOptions: KitSSOOptions, mode: string, redirect: string);
    getTokenFromCookie(cookie: any): any;
    getTokenFromUrl(url: any, callback: (token: any) => void): void;
    isValidToken(token: any, time: number): any;
    buildAuthorization(token: any, mode: string): string;
    logout(token: any, callback: () => void): void;
    private buildCxnUrl(redirect);
}
