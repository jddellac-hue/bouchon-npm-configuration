import { PeAuthFlow } from "./pe-auth-flow";
export declare class ImplicitFlow implements PeAuthFlow {
    getTokenFromUrl(url: any, callback: (token: any) => void): void;
    isValidToken(token: any, time: number, state: string, nonce: string): boolean;
    private extractToken(url);
}
