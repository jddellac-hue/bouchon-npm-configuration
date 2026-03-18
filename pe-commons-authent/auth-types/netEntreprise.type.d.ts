import { PeAuthType, NetEntrepriseOptions } from '../declarations/index';
export declare class NetEntrepriseType implements PeAuthType {
    ready: Promise<NetEntrepriseType>;
    cxnUrl: string;
    autoReload: boolean;
    cookieName: string;
    private _options;
    constructor(netEntrepriseOptions: NetEntrepriseOptions, mode: string, redirect: string);
    getTokenFromCookie(cookie: any): any;
    getTokenFromUrl(url: any, callback: (token: any) => void): void;
    isValidToken(token: any, time: number): boolean;
    buildAuthorization(token: any, mode: string): string;
    logout(token: any, callback: () => void): void;
    private buildCxnUrl(redirect);
}
