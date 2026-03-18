import { InjectionToken } from '@angular/core';
/**
 * @name PeAuthOptions
 * @description
 *
 * Cet object contient les options par defaut à passer à l'authentification.
 *
 * Cet object peut contenir les propriétés suivantes
 *
 * - **webSSO** - {any} - l'objet de configuration des options webSSO.
 * - **netEntreprise** - {any} - l'objet de configuration des options netEntreprise.
 * - **openAM** - {any} - l'objet de configuration des options openAM.
 * - **redirectUrl** - {string} - l'uri de redirection après connexion. Important: c'est une url relative! La redirection se fait vers une page du domaine.
 * - **loginRoute** - {any[]} - refer to angular Router.navigate(). Used by PeAuthGuardService.
 * - **connectBy** - {"iframe","window"} - le type de connexion (par défaut "iframe").
 * - **maxRetry** - {number} - nombre max de tentative de connexion (par défaut 5).
 */
export interface PeAuthOptions {
    webSSO?: {
        agent?: WebSSOOptions;
    };
    kitSSO?: {
        agent?: KitSSOOptions;
    };
    netEntreprise?: {
        partenaire?: NetEntrepriseOptions;
    };
    openAM?: {
        agent?: OpenAMOptions;
        individu?: OpenAMOptions;
        employeur?: OpenAMOptions;
        partenaire?: OpenAMOptions;
    };
    redirectUrl?: string;
    loginRoute?: any[];
    connectBy?: 'window' | 'iframe';
    maxRetry?: number;
}
/**
 * @name WebSSOOptions
 * @description
 *
 * Cet object contient les options par defaut à passer pour une authentification en WebSSO.
 *
 * Cet object peut contenir les propriétés suivantes
 *
 * - **cadre** - {string} - cadre déploiement.
 * - **tokenValidityDuration** - {number} - durée de validité du token en heure.
 * - **webSSOUrl** - {string} - l'url de connexion.
 */
export interface WebSSOOptions {
    cadre?: string;
    tokenValidityDuration?: number;
    webSSOUrl: string;
}
/**
 * @name KitSSOOptions
 * @description
 *
 * Cet object contient les options par defaut à passer pour une authentification en KitSSO.
 *
 * Cet object peut contenir les propriétés suivantes
 *
 * - **cadre** - {string} - cadre déploiement.
 * - **tokenValidityDuration** - {number} - durée de validité du token en heure.
 * - **kitSSOUrl** - {string} - l'url de connexion.
 */
export interface KitSSOOptions {
    cadre?: string;
    tokenValidityDuration?: number;
    kitSSOUrl: string;
}
/**
 * @name NetEntrepriseOptions
 * @description
 *
 * Cet object contient les options par defaut à passer pour une authentification en NetEntreprise.
 *
 * Cet object peut contenir les propriétés suivantes
 *
 * - **cadre** - {string} - cadre déploiement.
 * - **netEntrepriseUrl** - {string} - l'url de connexion.
 */
export interface NetEntrepriseOptions {
    cadre?: string;
    netEntrepriseUrl?: string;
}
/**
 * @name OpenAMOptions
 * @description
 *
 * Cet object contient les options par defaut à passer pour une authentification en OpenAM.
 *
 * Cet object peut contenir les propriétés suivantes
 *
 * - **cadre** - {string} - cadre déploiement.
 * - **openAMUrl** - {string} - l'url de connexion.
 * - **clientId** - {string} - l'identifiant client.
 * - **flow** - {string} - strategie d'accès au token.
 * - **authorizeResource** - {any} - configuration de l'authorisation.
 * - **logoutResource** - {string} - configuration de la déconnexion.
 */
export interface OpenAMOptions {
    cadre?: string;
    openAMUrl: string;
    clientId: string;
    accessTokenFlow: string;
    authorizeResource: {
        url: string;
        scope: string;
        responseType: string;
        accessTokenUrl?: string;
        externalAccessTokenUrl?: string;
    };
    logoutResource?: {
        urlOIDC: string;
        urlOpenAM: string;
    };
}
/**
 * @name AUTH_OPTIONS
 * @description
 *
 * InjectionToken pour la gestion des configurations du module d'authentification.
 */
export declare const AUTH_OPTIONS: InjectionToken<PeAuthOptions>;
