"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

// --- OpenAMType ---
const OpenAMType = { AGENT: 'AGENT', FLOW_IMPLICIT: 'FLOW_IMPLICIT' };
exports.OpenAMType = OpenAMType;

// --- PeAuthTypeFactory ---
class PeAuthTypeFactory {}
PeAuthTypeFactory.AUTH_PEAM = 'AUTH_PEAM';
PeAuthTypeFactory.MODE_AGENT = 'MODE_AGENT';
exports.PeAuthTypeFactory = PeAuthTypeFactory;

// --- PeAuthOptions ---
class PeAuthOptions {}
exports.PeAuthOptions = PeAuthOptions;

// --- PeAuthGuardService ---
class PeAuthGuardService {
  canActivate() { return true; }
}
exports.PeAuthGuardService = PeAuthGuardService;

// --- PeAuthModule ---
// Le composant <pe-auth> et le NgModule ne peuvent pas être définis
// en JS pur (les décorateurs Angular nécessitent la compilation).
// On fournit un module vide — le projet doit utiliser CUSTOM_ELEMENTS_SCHEMA
// ou NO_ERRORS_SCHEMA si le template utilise <pe-auth>.
class PeAuthModule {
  static forRoot(options) {
    return { ngModule: PeAuthModule, providers: [] };
  }
}
exports.PeAuthModule = PeAuthModule;
