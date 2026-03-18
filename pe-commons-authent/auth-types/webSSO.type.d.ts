import { PeAuthType, WebSSOOptions } from '../declarations/index';
export declare class WebSSOType implements PeAuthType {
    ready: Promise<WebSSOType>;
    cxnUrl: string;
    autoReload: boolean;
    cookieName: string;
    private _options;
    constructor(webSSOOptions: WebSSOOptions, mode: string, redirect: string);
    getTokenFromCookie(cookie: any): any;
    getTokenFromUrl(url: any, callback: (token: any) => void): void;
    isValidToken(token: any, time: number): any;
    buildAuthorization(token: any, mode: string): string;
    logout(token: any, callback: () => void): void;
    private buildCxnUrl(redirect);
}
