import { Observable } from "rxjs";
export interface OnConnect {
    onConnect: (token: string, refreshToken: boolean, attempt: number) => Observable<boolean> | Promise<boolean> | boolean;
}
