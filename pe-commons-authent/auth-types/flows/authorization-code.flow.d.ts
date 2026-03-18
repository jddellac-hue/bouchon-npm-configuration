import { PeAuthFlow } from "./pe-auth-flow";
import { HttpClient } from "@angular/common/http";
import { OpenAMOptions } from "../../declarations/pe-auth.options";
export declare class AuthorizationCodeFlow implements PeAuthFlow {
    private http;
    private _options;
    private _redirect_uri;
    private _state;
    constructor(http: HttpClient, openAMOptions: OpenAMOptions, state: string, redirect_uri: string);
    getTokenFromUrl(url: any, callback: (token: any) => void): void;
    isValidToken(token: any, time: number, state: string, nonce: string): boolean;
}
