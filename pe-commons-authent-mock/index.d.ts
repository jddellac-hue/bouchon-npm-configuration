import { ModuleWithProviders } from '@angular/core';
import { CanActivate } from '@angular/router';

export interface OnConnect {
  onConnect: (token: string, refreshToken: boolean) => any;
}

export declare class PeAuthOptions {
  openAM?: any;
  connectBy?: string;
  redirectUrl?: string;
  loginRoute?: string[];
}

export declare const OpenAMType: {
  AGENT: string;
  FLOW_IMPLICIT: string;
};

export declare class PeAuthTypeFactory {
  static AUTH_PEAM: string;
  static MODE_AGENT: string;
}

export declare class PeAuthGuardService implements CanActivate {
  canActivate(): boolean;
}

export declare class PeAuthModule {
  static forRoot(options: PeAuthOptions): ModuleWithProviders<PeAuthModule>;
}
