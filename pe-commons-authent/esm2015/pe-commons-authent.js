import { InjectionToken, Injectable, Inject, RendererFactory2, NgZone, Injector, Component, ElementRef, Input, NgModule } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient, HttpErrorResponse, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SHA256, enc, lib } from 'crypto-js';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { CookieService, CookieModule } from 'ngx-cookie';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * \@name PeAuthOptions
 * \@description
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
 * @record
 */

/**
 * \@name WebSSOOptions
 * \@description
 *
 * Cet object contient les options par defaut à passer pour une authentification en WebSSO.
 *
 * Cet object peut contenir les propriétés suivantes
 *
 * - **cadre** - {string} - cadre déploiement.
 * - **tokenValidityDuration** - {number} - durée de validité du token en heure.
 * - **webSSOUrl** - {string} - l'url de connexion.
 * @record
 */

/**
 * \@name KitSSOOptions
 * \@description
 *
 * Cet object contient les options par defaut à passer pour une authentification en KitSSO.
 *
 * Cet object peut contenir les propriétés suivantes
 *
 * - **cadre** - {string} - cadre déploiement.
 * - **tokenValidityDuration** - {number} - durée de validité du token en heure.
 * - **kitSSOUrl** - {string} - l'url de connexion.
 * @record
 */

/**
 * \@name NetEntrepriseOptions
 * \@description
 *
 * Cet object contient les options par defaut à passer pour une authentification en NetEntreprise.
 *
 * Cet object peut contenir les propriétés suivantes
 *
 * - **cadre** - {string} - cadre déploiement.
 * - **netEntrepriseUrl** - {string} - l'url de connexion.
 * @record
 */

/**
 * \@name OpenAMOptions
 * \@description
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
 * @record
 */

/**
 * \@name AUTH_OPTIONS
 * \@description
 *
 * InjectionToken pour la gestion des configurations du module d'authentification.
 */
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common/http';
import * as ɵngcc2 from '@angular/common';
import * as ɵngcc3 from 'ngx-cookie';
import * as ɵngcc4 from '@angular/router';
const AUTH_OPTIONS = new InjectionToken('AUTH_OPTIONS');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * \@name searchParams
 * \@description
 *
 * Cet méthode permet de récupérer les paramètres d'une url.
 *
 * Si un object d'exemple est présent, seul les paramètres qui seront présents
 * en clé dans l'object d'exemple seront récupérés.
 *
 * - **url** - {string} - l'url analysée.
 * - **inner** - {any} - object exemple.
 * @param {?} url
 * @param {?=} inner
 * @return {?}
 */
function searchParams(url, inner) {
    const /** @type {?} */ params = {};
    const /** @type {?} */ pStr = url.substr(url.indexOf('?') + 1);
    const /** @type {?} */ pReg = /([^=]*)=([^&]*)&?/g;
    let /** @type {?} */ pMatch;
    while ((pMatch = pReg.exec(pStr)) !== null) {
        if (!inner || inner[pMatch[1]]) {
            params[pMatch[1]] = decodeURIComponent(pMatch[2]);
        }
    }
    return params;
}
/**
 * \@name fixEncapsulationAttr
 * \@description
 *
 * Cet méthode permet de récupérer l'attribut d'encapsulation du style d'un élément HTML.
 * retourne null si aucun attribut d'encapsulation n'est trouvé.
 *
 * - **el** - {HTMLElement} - l'element analysé.
 * @param {?} el
 * @return {?}
 */
function getEncapsulationAttr(el) {
    for (let /** @type {?} */ i = 0; i < el.attributes.length; i++) {
        if (el.attributes[i].name.startsWith('_nghost-')) {
            return '_ngcontent-' + el.attributes[i].name.substr(8);
        }
        if (el.attributes[i].name.startsWith('_ngcontent-')) {
            return el.attributes[i].name;
        }
    }
    return null;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @param {?} cookieName
 * @param {?} prefix
 * @param {?} suffix
 * @return {?}
 */
function formatCookieName(cookieName, prefix, suffix) {
    return (prefix ? (prefix + "_") : "") + cookieName + (suffix ? suffix : "");
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class WebSSOType {
    /**
     * @param {?} webSSOOptions
     * @param {?} mode
     * @param {?} redirect
     */
    constructor(webSSOOptions, mode, redirect) {
        this.autoReload = true;
        this.cookieName = 'userToken';
        this.cookieName = formatCookieName(this.cookieName, webSSOOptions.cadre, "");
        this._options = webSSOOptions;
        this.cxnUrl = this.buildCxnUrl(redirect);
        this.ready = Promise.resolve(this);
    }
    /**
     * @param {?} cookie
     * @return {?}
     */
    getTokenFromCookie(cookie) {
        return typeof cookie === 'string' ? JSON.parse(cookie) : cookie;
    }
    ;
    /**
     * @param {?} url
     * @param {?} callback
     * @return {?}
     */
    getTokenFromUrl(url, callback) {
        let /** @type {?} */ token;
        try {
            token = JSON.parse(searchParams(url)['j_username']);
        }
        catch (/** @type {?} */ e) {
            token = null;
        }
        callback(token);
    }
    ;
    /**
     * @param {?} token
     * @param {?} time
     * @return {?}
     */
    isValidToken(token, time) {
        let /** @type {?} */ isValid;
        try {
            const /** @type {?} */ h = this._options.hasOwnProperty("tokenValidityDuration") ? this._options.tokenValidityDuration : 24;
            isValid = (Date.now() - token['attributs']['timestamp'] < 1000 * 60 * 60 * h) && token['resultatAuthent'] === true;
        }
        catch (/** @type {?} */ e) {
            isValid = false;
        }
        return isValid;
    }
    ;
    /**
     * @param {?} token
     * @param {?} mode
     * @return {?}
     */
    buildAuthorization(token, mode) {
        return 'Bearer ' + mode + JSON.stringify(token);
    }
    /**
     * @param {?} token
     * @param {?} callback
     * @return {?}
     */
    logout(token, callback) {
        callback();
    }
    /**
     * @param {?} redirect
     * @return {?}
     */
    buildCxnUrl(redirect) {
        let /** @type {?} */ url = this._options.webSSOUrl;
        url += (this._options.webSSOUrl.indexOf('?') > -1 ? '&' : '?') + 'referer=' + encodeURIComponent(redirect);
        return url;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class KitSSOType {
    /**
     * @param {?} kitSSOOptions
     * @param {?} mode
     * @param {?} redirect
     */
    constructor(kitSSOOptions, mode, redirect) {
        this.autoReload = true;
        this.cookieName = 'userToken';
        this.cookieName = formatCookieName(this.cookieName, kitSSOOptions.cadre, KitSSOType.COOKIE_SUFFIXE[mode]);
        this._options = kitSSOOptions;
        this.cxnUrl = this.buildCxnUrl(redirect);
        this.ready = Promise.resolve(this);
    }
    /**
     * @param {?} cookie
     * @return {?}
     */
    getTokenFromCookie(cookie) {
        return typeof cookie === 'string' ? JSON.parse(cookie) : cookie;
    }
    ;
    /**
     * @param {?} url
     * @param {?} callback
     * @return {?}
     */
    getTokenFromUrl(url, callback) {
        let /** @type {?} */ token;
        try {
            token = JSON.parse(searchParams(url)['j_username']);
        }
        catch (/** @type {?} */ e) {
            token = null;
        }
        callback(token);
    }
    ;
    /**
     * @param {?} token
     * @param {?} time
     * @return {?}
     */
    isValidToken(token, time) {
        let /** @type {?} */ isValid;
        try {
            const /** @type {?} */ h = this._options.hasOwnProperty("tokenValidityDuration") ? this._options.tokenValidityDuration : 24;
            isValid = (Date.now() - token['attributs']['timestamp'] < 1000 * 60 * 60 * h) && token['resultatAuthent'] === true;
        }
        catch (/** @type {?} */ e) {
            isValid = false;
        }
        return isValid;
    }
    ;
    /**
     * @param {?} token
     * @param {?} mode
     * @return {?}
     */
    buildAuthorization(token, mode) {
        return 'Bearer ' + mode + JSON.stringify(token);
    }
    /**
     * @param {?} token
     * @param {?} callback
     * @return {?}
     */
    logout(token, callback) {
        callback();
    }
    /**
     * @param {?} redirect
     * @return {?}
     */
    buildCxnUrl(redirect) {
        let /** @type {?} */ url = this._options.kitSSOUrl;
        url += (this._options.kitSSOUrl.indexOf('?') > -1 ? '&' : '?') + 'referer=' + encodeURIComponent(redirect);
        return url;
    }
}
KitSSOType.COOKIE_SUFFIXE = {
    agent: 'A'
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AuthorizationCodeFlow {
    /**
     * @param {?} http
     * @param {?} openAMOptions
     * @param {?} state
     * @param {?} redirect_uri
     */
    constructor(http, openAMOptions, state, redirect_uri) {
        this.http = http;
        this._options = openAMOptions;
        this._redirect_uri = redirect_uri;
        this._state = state;
    }
    /**
     * @param {?} url
     * @param {?} callback
     * @return {?}
     */
    getTokenFromUrl(url, callback) {
        const /** @type {?} */ urlParams = searchParams(url);
        if (urlParams['state'] === this._state && urlParams.hasOwnProperty('code')) {
            const /** @type {?} */ body = [
                `grant_type=authorization_code`,
                `code=${urlParams['code']}`,
                `client_id=${this._options.clientId}`,
                `redirect_uri=${encodeURIComponent(this._redirect_uri)}`,
            ].join('&');
            const /** @type {?} */ authorizeResource = this._options.authorizeResource;
            const /** @type {?} */ accessTokenUrl = authorizeResource.accessTokenUrl ? (this._options.openAMUrl + authorizeResource.accessTokenUrl) : authorizeResource.externalAccessTokenUrl;
            if (!accessTokenUrl)
                throw "accessTokenUrl or externalAccessTokenUrl is required in configurations";
            this.http.post(accessTokenUrl, body, {
                headers: new HttpHeaders({
                    "Content-Type": "application/x-www-form-urlencoded"
                }),
            }).subscribe(data => callback(data), resp => callback(null));
        }
        else {
            callback(null);
        }
    }
    /**
     * @param {?} token
     * @param {?} time
     * @param {?} state
     * @param {?} nonce
     * @return {?}
     */
    isValidToken(token, time, state, nonce) {
        return token['nonce'] === nonce && parseInt(token['expires_in']) * 1000 + time > Date.now();
    }
    ;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ImplicitFlow {
    /**
     * @param {?} url
     * @param {?} callback
     * @return {?}
     */
    getTokenFromUrl(url, callback) {
        callback(this.extractToken(url.indexOf('#') >= 0 ? url.split('#')[1] : ''));
    }
    /**
     * @param {?} token
     * @param {?} time
     * @param {?} state
     * @param {?} nonce
     * @return {?}
     */
    isValidToken(token, time, state, nonce) {
        return token['state'] === state && parseInt(token['expires_in']) * 1000 + time > Date.now();
    }
    ;
    /**
     * @param {?} url
     * @return {?}
     */
    extractToken(url) {
        return searchParams(url, {
            scope: true,
            nonce: true,
            expires_in: true,
            token_type: true,
            refresh_token: true,
            id_token: true,
            access_token: true,
            state: true
        });
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AuthorizationCodeWithPKCEFlow {
    /**
     * @param {?} http
     * @param {?} openAMOptions
     * @param {?} state
     * @param {?} redirect_uri
     * @param {?} verifier
     */
    constructor(http, openAMOptions, state, redirect_uri, verifier) {
        this.http = http;
        this._options = openAMOptions;
        this._redirect_uri = redirect_uri;
        this._state = state;
        this._verifier = verifier;
    }
    /**
     * @param {?} url
     * @param {?} callback
     * @return {?}
     */
    getTokenFromUrl(url, callback) {
        const /** @type {?} */ urlParams = searchParams(url);
        if (urlParams['state'] === this._state && urlParams.hasOwnProperty('code')) {
            const /** @type {?} */ body = [
                `grant_type=authorization_code`,
                `code=${urlParams['code']}`,
                `client_id=${this._options.clientId}`,
                `redirect_uri=${encodeURIComponent(this._redirect_uri)}`,
                `code_verifier=${this._verifier}`
            ].join('&');
            const /** @type {?} */ authorizeResource = this._options.authorizeResource;
            const /** @type {?} */ accessTokenUrl = authorizeResource.accessTokenUrl ? (this._options.openAMUrl + authorizeResource.accessTokenUrl) : authorizeResource.externalAccessTokenUrl;
            if (!accessTokenUrl)
                throw "accessTokenUrl or externalAccessTokenUrl is required in configurations";
            this.http.post(accessTokenUrl, body, {
                headers: new HttpHeaders({
                    "Content-Type": "application/x-www-form-urlencoded"
                }),
            }).subscribe(data => callback(data), resp => callback(null));
        }
        else {
            callback(null);
        }
    }
    /**
     * @param {?} token
     * @param {?} time
     * @param {?} state
     * @param {?} nonce
     * @return {?}
     */
    isValidToken(token, time, state, nonce) {
        return token['nonce'] === nonce && parseInt(token['expires_in']) * 1000 + time > Date.now();
    }
    ;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class OpenAMType {
    /**
     * @param {?} openAMOptions
     * @param {?} mode
     * @param {?} redirect
     * @param {?} http
     */
    constructor(openAMOptions, mode, redirect, http) {
        this.autoReload = false;
        this.cookieName = 'userBadge';
        this.storage = localStorage;
        this.cookieName = formatCookieName(this.cookieName, openAMOptions.cadre, OpenAMType.COOKIE_SUFFIXE[mode]);
        this._options = openAMOptions;
        this._redirect_uri = redirect;
        this._state = this.randomizeString(16);
        this._nonce = this.randomizeString(16);
        this.cxnUrl = this.buildCxnUrl(mode);
        this._storageKey = '__' + openAMOptions.clientId;
        this.http = http;
        switch (this._options.accessTokenFlow) {
            case OpenAMType.FLOW_AUTHORIZATION_CODE:
                this._flow = new AuthorizationCodeFlow(http, this._options, this._state, redirect);
                break;
            case OpenAMType.FLOW_AUTHORIZATION_CODE_WITH_PKCE:
                this._verifier = this.randomizeString(50);
                this._code_challenge_method = "S256";
                this._code_challenge = this.base64URLEncode(SHA256(this._verifier));
                this.cxnUrl += `&code_challenge=${this._code_challenge}&code_challenge_method=${this._code_challenge_method}`;
                this._flow = new AuthorizationCodeWithPKCEFlow(http, this._options, this._state, redirect, this._verifier);
                break;
            case OpenAMType.FLOW_IMPLICIT:
                this._flow = new ImplicitFlow();
                break;
            default:
                throw 'Access token flow "' + this._options.accessTokenFlow + '" does not exists.';
        }
        this.ready = Promise.resolve(this);
    }
    /**
     * @param {?} cookie
     * @return {?}
     */
    getTokenFromCookie(cookie) {
        return typeof cookie === 'string' ? JSON.parse(cookie) : cookie;
    }
    ;
    /**
     * @param {?} url
     * @param {?} callback
     * @return {?}
     */
    getTokenFromUrl(url, callback) {
        this._flow.getTokenFromUrl(url, callback);
    }
    ;
    /**
     * @param {?} token
     * @param {?} time
     * @return {?}
     */
    isValidToken(token, time) {
        let /** @type {?} */ nonce;
        let /** @type {?} */ state;
        if (time > 0) {
            nonce = this._nonce;
            state = this._state;
            this.storage.setItem(this._storageKey, JSON.stringify({ state: this._state, nonce: this._nonce, time: time }));
        }
        else {
            const /** @type {?} */ lastCxn = JSON.parse(this.storage.getItem(this._storageKey));
            time = lastCxn.time;
            nonce = lastCxn.nonce;
            state = lastCxn.state;
        }
        
        return this._flow.isValidToken(token, time, state, nonce);
    }
    ;
    /**
     * @param {?} token
     * @param {?} mode
     * @return {?}
     */
    buildAuthorization(token, mode) {
        return 'Bearer ' + token['access_token'];
    }
    /**
     * @param {?} token
     * @param {?} callback
     * @return {?}
     */
    logout(token, callback) {
        if (token !== null) {
            const /** @type {?} */ logoutUrl = this.buildLogoutUrl();
            const /** @type {?} */ oidcParams = new HttpParams().set('id_token_hint', token['id_token']);
            this.http.get(logoutUrl.oidc, { params: oidcParams }).subscribe(callback, err => {
                this.http.get(logoutUrl.oam).subscribe(callback, callback);
            });
        }
        else {
            callback();
        }
    }
    /**
     * @param {?} words
     * @return {?}
     */
    base64URLEncode(words) {
        return enc.Base64.stringify(words).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    }
    /**
     * @param {?} mode
     * @return {?}
     */
    buildCxnUrl(mode) {
        let /** @type {?} */ url = this._options.openAMUrl + this._options.authorizeResource.url;
        url += (url.indexOf('?') > -1 ? '&' : '?') + 'realm=' + encodeURIComponent('/' + mode);
        url += '&response_type=' + encodeURIComponent(this._options.authorizeResource.responseType);
        url += '&client_id=' + this._options.clientId;
        url += '&scope=' + encodeURIComponent(this._options.authorizeResource.scope);
        url += '&redirect_uri=' + encodeURIComponent(this._redirect_uri);
        url += '&state=' + this._state;
        url += '&nonce=' + this._nonce;
        return url;
    }
    /**
     * @param {?} length
     * @return {?}
     */
    randomizeString(length) {
        return this.base64URLEncode(lib.WordArray.random(length));
    }
    /**
     * @return {?}
     */
    buildLogoutUrl() {
        let /** @type {?} */ oidc = this._options.openAMUrl + this._options.logoutResource.urlOIDC;
        let /** @type {?} */ oam = this._options.openAMUrl + this._options.logoutResource.urlOpenAM;
        return {
            oidc: oidc,
            oam: oam
        };
    }
}
OpenAMType.FLOW_AUTHORIZATION_CODE = "authorizationCodeFlow";
OpenAMType.FLOW_IMPLICIT = "implicitFlow";
OpenAMType.FLOW_AUTHORIZATION_CODE_WITH_PKCE = "authorizationCodeWithPKCEFlow";
OpenAMType.COOKIE_SUFFIXE = {
    agent: 'A',
    individu: 'I',
    employeur: 'E',
    partenaire: 'P'
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NetEntrepriseType {
    /**
     * @param {?} netEntrepriseOptions
     * @param {?} mode
     * @param {?} redirect
     */
    constructor(netEntrepriseOptions, mode, redirect) {
        this.autoReload = false;
        this.cookieName = "netToken";
        this.cookieName = formatCookieName(this.cookieName, netEntrepriseOptions.cadre, "");
        this._options = netEntrepriseOptions;
        this.cxnUrl = this.buildCxnUrl(redirect);
        this.ready = Promise.resolve(this);
    }
    /**
     * @param {?} cookie
     * @return {?}
     */
    getTokenFromCookie(cookie) {
        return cookie;
    }
    ;
    /**
     * @param {?} url
     * @param {?} callback
     * @return {?}
     */
    getTokenFromUrl(url, callback) {
        let /** @type {?} */ token;
        try {
            token = searchParams(url)['ticket'];
        }
        catch (/** @type {?} */ e) {
            token = null;
        }
        callback(token ? token : null);
    }
    ;
    /**
     * @param {?} token
     * @param {?} time
     * @return {?}
     */
    isValidToken(token, time) {
        return token !== null;
    }
    ;
    /**
     * @param {?} token
     * @param {?} mode
     * @return {?}
     */
    buildAuthorization(token, mode) {
        return 'Bearer ' + mode + token;
    }
    /**
     * @param {?} token
     * @param {?} callback
     * @return {?}
     */
    logout(token, callback) {
        callback();
    }
    /**
     * @param {?} redirect
     * @return {?}
     */
    buildCxnUrl(redirect) {
        let /** @type {?} */ url = null;
        if (this._options.netEntrepriseUrl) {
            throw 'Net-Entreprise connexion is not yet implemented.';
        }
        return url;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PeAuthTypeFactory {
    /**
     * @param {?} options
     * @param {?} http
     * @param {?} locationStrategy
     */
    constructor(options, http, locationStrategy) {
        this.http = http;
        this.locationStrategy = locationStrategy;
        this._authOptions = options;
        if (!options.redirectUrl.startsWith('http'))
            this.buildRedirectPath();
    }
    /**
     * @return {?}
     */
    get redirectUrl() {
        return this._authOptions.redirectUrl;
    }
    /**
     * @return {?}
     */
    get loginRoute() {
        return this._authOptions.loginRoute;
    }
    /**
     * @return {?}
     */
    get connectBy() {
        return this._authOptions.connectBy ? this._authOptions.connectBy : 'iframe';
    }
    /**
     * @return {?}
     */
    get maxRetry() {
        return this._authOptions.maxRetry ? this._authOptions.maxRetry : 5;
    }
    /**
     * @param {?} type
     * @param {?} mode
     * @return {?}
     */
    getPeAuthType(type, mode) {
        switch (type) {
            //AUTH WEBSSO
            case PeAuthTypeFactory.AUTH_WEBSSO:
                if (!(mode === PeAuthTypeFactory.MODE_AGENT))
                    throw 'Invalid authentification : ' + mode + ' does not exist for type' + type + '.';
                const /** @type {?} */ webSSOOptions = this._authOptions.webSSO[mode];
                return new WebSSOType(webSSOOptions, mode, this._authOptions.redirectUrl);
            //AUTH KITSSO
            case PeAuthTypeFactory.AUTH_KITSSO:
                if (!(mode === PeAuthTypeFactory.MODE_AGENT))
                    throw 'Invalid authentification : ' + mode + ' does not exist for type' + type + '.';
                const /** @type {?} */ kitSSOOptions = this._authOptions.kitSSO[mode];
                return new KitSSOType(kitSSOOptions, mode, this._authOptions.redirectUrl);
            //AUTH NETENTREPRISE
            case PeAuthTypeFactory.AUTH_NET_ENTREPRISE:
                if (!(mode === PeAuthTypeFactory.MODE_PARTENAIRE))
                    throw 'Invalid authentification : ' + mode + ' does not exist for type' + type + '.';
                const /** @type {?} */ netEntrepriseOptions = this._authOptions.netEntreprise[mode];
                return new NetEntrepriseType(netEntrepriseOptions, mode, this._authOptions.redirectUrl);
            //AUT OPENAM
            case PeAuthTypeFactory.AUTH_PEAM:
                if (!(mode === PeAuthTypeFactory.MODE_AGENT || mode === PeAuthTypeFactory.MODE_EMPLOYEUR || mode === PeAuthTypeFactory.MODE_INDIVIDU || mode === PeAuthTypeFactory.MODE_PARTENAIRE))
                    throw 'Invalid authentification : ' + mode + ' does not exist for type' + type + '.';
                const /** @type {?} */ openAMOptions = this._authOptions.openAM[mode];
                return new OpenAMType(openAMOptions, mode, this._authOptions.redirectUrl, this.http);
            default:
                throw 'Invalid authentification : ' + type + ' does not exist.';
        }
    }
    /**
     * @return {?}
     */
    buildRedirectPath() {
        let /** @type {?} */ baseHref = '';
        if (this.locationStrategy instanceof HashLocationStrategy) {
            baseHref = window.location.pathname;
        }
        else if (this.locationStrategy instanceof PathLocationStrategy) {
            baseHref = this.locationStrategy.getBaseHref();
        }
        baseHref = baseHref ? (baseHref.endsWith('/') ? baseHref.substring(0, baseHref.length - 1) : baseHref) : '';
        this._authOptions.redirectUrl = window.location.origin + baseHref + this._authOptions.redirectUrl;
    }
}
PeAuthTypeFactory.ɵfac = function PeAuthTypeFactory_Factory(t) { return new (t || PeAuthTypeFactory)(ɵngcc0.ɵɵinject(AUTH_OPTIONS), ɵngcc0.ɵɵinject(ɵngcc1.HttpClient), ɵngcc0.ɵɵinject(ɵngcc2.LocationStrategy)); };
PeAuthTypeFactory.ɵprov = /*@__PURE__*/ ɵngcc0.ɵɵdefineInjectable({ token: PeAuthTypeFactory, factory: PeAuthTypeFactory.ɵfac });
PeAuthTypeFactory.MODE_AGENT = 'agent';
PeAuthTypeFactory.MODE_EMPLOYEUR = 'employeur';
PeAuthTypeFactory.MODE_INDIVIDU = 'individu';
PeAuthTypeFactory.MODE_PARTENAIRE = 'partenaire';
PeAuthTypeFactory.AUTH_WEBSSO = 'webSSO';
PeAuthTypeFactory.AUTH_KITSSO = 'kitSSO';
PeAuthTypeFactory.AUTH_NET_ENTREPRISE = 'netEntreprise';
PeAuthTypeFactory.AUTH_PEAM = 'openAM';
/** @nocollapse */
PeAuthTypeFactory.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [AUTH_OPTIONS,] },] },
    { type: HttpClient, },
    { type: LocationStrategy, },
];
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(PeAuthTypeFactory, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [AUTH_OPTIONS]
            }] }, { type: ɵngcc1.HttpClient }, { type: ɵngcc2.LocationStrategy }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PeAuthService {
    /**
     * @param {?} peAuthTypeFactory
     * @param {?} cookieService
     * @param {?} rendererFactory
     * @param {?} ngZone
     */
    constructor(peAuthTypeFactory, cookieService, rendererFactory, ngZone) {
        this.peAuthTypeFactory = peAuthTypeFactory;
        this.cookieService = cookieService;
        this.rendererFactory = rendererFactory;
        this.ngZone = ngZone;
        this._time = 0;
        this._type = null;
        this._mode = null;
        this._status = PeAuthService.CXN_OFF;
        this._token = null;
        this._nbAttempt = 0;
        this._subject = new BehaviorSubject({ status: this._status, token: this._token, refreshToken: false, attempt: this._nbAttempt });
        this._onConnect = () => true;
        this.recievedMessage = (e, refreshToken) => {
            const /** @type {?} */ parentNode = this.getIframeParentNode();
            if (!parentNode) {
                this.stopListening();
            }
            else {
                const /** @type {?} */ isWindow = this._iframe.window === this._iframe;
                const /** @type {?} */ win = isWindow ? this._iframe : this._iframe.contentWindow;
                if (e.origin === window.location.origin && e.source === win && e.data !== null && e.data.startsWith(this.peAuthTypeFactory.redirectUrl)) {
                    this.ngZone.run(() => {
                        const /** @type {?} */ promise = new Promise((resolve, reject) => {
                            let /** @type {?} */ reloaded = false;
                            this.authByUrl(e.data).then(() => {
                                resolve(reloaded);
                            }).catch(() => {
                                if (reloaded = this._authType.autoReload) {
                                    if (this._nbAttempt === this.peAuthTypeFactory.maxRetry) {
                                        this._status = PeAuthService.CXN_MAX_RETRY;
                                        reloaded = false;
                                    }
                                    else {
                                        this._nbAttempt++;
                                        this._subject.next({ status: this._status, token: this._token, refreshToken: refreshToken, attempt: this._nbAttempt });
                                        win.location.href = this._authType.cxnUrl;
                                    }
                                }
                                else {
                                    this._status = PeAuthService.CXN_ECHEC;
                                }
                                resolve(reloaded);
                            });
                        });
                        promise.then(reloaded => {
                            if (!reloaded) {
                                if (isWindow) {
                                    win.close();
                                }
                                else {
                                    this._renderer.removeChild(parentNode, this._iframe);
                                }
                                this.stopListening();
                                this.afterCxn(this._token, this._status, refreshToken);
                            }
                        });
                    });
                }
            }
        };
        this.iframeLoaded = (e) => {
            setTimeout(() => {
                try {
                    const /** @type {?} */ parentNode = this._renderer.parentNode(this._iframe);
                    if (parentNode !== null) {
                        const /** @type {?} */ loc = this._iframe.contentWindow.location;
                        if (loc.origin + loc.pathname !== this.peAuthTypeFactory.redirectUrl)
                            throw 'Not redirect yet.';
                    }
                }
                catch (/** @type {?} */ e) {
                    if (this._iframe)
                        this._renderer.setAttribute(this._iframe, 'class', 'pe-auth-login');
                }
            }, 500);
            this._iframeLoadListener();
        };
        this._renderer = this.rendererFactory.createRenderer(null, null);
        this._cookieOptions = {
            path: '/',
            domain: window.location.hostname.split('.').splice(-2).join('.'),
            secure: window.location.protocol === 'https:'
        };
    }
    /**
     * @param {?} event
     * @param {?} fn
     * @return {?}
     */
    on(event, fn) {
        switch (event) {
            case "connect":
                this._onConnect = fn;
                break;
        }
    }
    /**
     * @param {?} token
     * @param {?} status
     * @param {?} refreshToken
     * @return {?}
     */
    afterCxn(token, status, refreshToken) {
        return new Promise((resolve, reject) => {
            /**
             * @param {?} e
             * @return {?}
             */
            function onError(e) {
                console.error(e);
                resolve(false);
            }
            if (status === PeAuthService.CXN_SUCCESS) {
                try {
                    const /** @type {?} */ res = this._onConnect(token, refreshToken, this._nbAttempt);
                    if (this.isObservable(res)) {
                        const /** @type {?} */ sub = (/** @type {?} */ (res)).subscribe(isConnect => {
                            resolve(isConnect);
                            setTimeout(() => {
                                if (sub) {
                                    sub.unsubscribe();
                                }
                            }, 0);
                        }, onError);
                    }
                    else if (this.isPromise(res)) {
                        (/** @type {?} */ (res)).then(resolve).catch(onError);
                    }
                    else {
                        resolve(res);
                    }
                }
                catch (/** @type {?} */ e) {
                    onError(e);
                }
            }
            else {
                resolve(false);
            }
        }).then(connect => {
            const /** @type {?} */ isSuccess = this._status === PeAuthService.CXN_SUCCESS;
            if (!connect && isSuccess) {
                this._status = PeAuthService.CXN_ECHEC;
            }
            this._subject.next({ status: this._status, token: this._token, refreshToken: refreshToken, attempt: this._nbAttempt });
            if (isSuccess) {
                this._nbAttempt = 0;
            }
        });
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    isPromise(obj) {
        return !!obj && typeof obj.then === 'function';
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    isObservable(obj) {
        return !!obj && typeof obj.subscribe === 'function';
    }
    /**
     * @return {?}
     */
    isConnected() {
        return this._status === PeAuthService.CXN_SUCCESS && this._authType && this._authType.isValidToken(this._token, this._time);
    }
    /**
     * @return {?}
     */
    getStatus() {
        return this._subject;
    }
    /**
     * @return {?}
     */
    get status() {
        return this._status;
    }
    /**
     * @return {?}
     */
    get type() {
        return this._type;
    }
    /**
     * @return {?}
     */
    get mode() {
        return this._mode;
    }
    /**
     * @return {?}
     */
    get authorizationHeader() {
        return this._authType && this._token ? this._authType.buildAuthorization(this._token, this._mode) : '';
    }
    /**
     * @return {?}
     */
    get loginRoute() {
        return this.peAuthTypeFactory.loginRoute;
    }
    /**
     * @return {?}
     */
    clear() {
        const /** @type {?} */ currentStatus = this._status;
        this._time = 0;
        this._type = null;
        this._mode = null;
        this._status = PeAuthService.CXN_OFF;
        this._token = null;
        this._nbAttempt = 0;
        if (this._authType) {
            this.cookieService.remove(this._authType.cookieName, this._cookieOptions);
        }
        if (currentStatus !== PeAuthService.CXN_OFF) {
            this._subject.next({ status: this._status, token: this._token, refreshToken: false, attempt: this._nbAttempt });
        }
    }
    /**
     * @return {?}
     */
    logout() {
        if (this._authType) {
            this._authType.logout(this._token, () => {
                this.clear();
            });
        }
        else {
            this.clear();
        }
        return this._subject;
    }
    /**
     * @param {?} refreshToken
     * @return {?}
     */
    inProgress(refreshToken) {
        this._status = PeAuthService.CXN_PROGRESS;
        this._nbAttempt++;
        this._subject.next({ status: this._status, token: this._token, refreshToken: refreshToken, attempt: this._nbAttempt });
    }
    /**
     * @param {?} type
     * @param {?} mode
     * @param {?=} container
     * @return {?}
     */
    connect(type, mode, container) {
        if (this._type !== type || this._mode !== mode || this._status !== PeAuthService.CXN_PROGRESS) {
            const /** @type {?} */ refreshToken = false;
            this._token = null;
            this._type = type;
            this._mode = mode;
            this._nbAttempt = 0;
            this.inProgress(refreshToken);
            this.peAuthTypeFactory.getPeAuthType(type, mode).ready.then(authType => {
                this._authType = authType;
                this.authByUrl(document.location.href).then(() => {
                    this.afterCxn(this._token, this._status, false);
                }).catch(() => {
                    this.ngZone.runOutsideAngular(() => {
                        if (!this.authByCookie()) {
                            this.auth(container ? container : document.body, refreshToken);
                        }
                    });
                });
            });
        }
        return this._subject;
    }
    /**
     * @param {?=} container
     * @return {?}
     */
    refreshToken(container) {
        if (!this._authType)
            throw 'Connexion required.';
        if (this._status !== PeAuthService.CXN_PROGRESS) {
            const /** @type {?} */ refreshToken = true;
            if (this._nbAttempt === (this.peAuthTypeFactory.maxRetry)) {
                this._status = PeAuthService.CXN_MAX_RETRY;
                this._subject.next({ status: this._status, token: this._token, refreshToken: refreshToken, attempt: this._nbAttempt });
            }
            else {
                this._token = null;
                this.cookieService.remove(this._authType.cookieName, this._cookieOptions);
                this.inProgress(refreshToken);
                this.ngZone.runOutsideAngular(() => {
                    setTimeout(() => {
                        this.auth(container ? container : document.body, refreshToken);
                    }, this._nbAttempt > 1 ? 500 : 0);
                });
            }
        }
        return this._subject;
    }
    /**
     * @return {?}
     */
    getIframeParentNode() {
        let /** @type {?} */ parentNode = null;
        if (this._iframe) {
            if (this._iframe.window === this._iframe) {
                parentNode = this._iframe.parent;
            }
            else {
                parentNode = this._renderer.parentNode(this._iframe);
            }
        }
        return parentNode;
    }
    /**
     * @return {?}
     */
    stopListening() {
        this._iframe = null;
        this._windowMessageListener();
    }
    /**
     * @param {?} url
     * @return {?}
     */
    authByUrl(url) {
        return new Promise((resolve, reject) => {
            this._time = Date.now();
            try {
                this._authType.getTokenFromUrl(url, (token) => {
                    if (!this._authType.isValidToken(token, this._time))
                        throw 'Invalid authent.';
                    this._status = PeAuthService.CXN_SUCCESS;
                    this._token = token;
                    this._cookieOptions.expires = new Date(Date.now() + 86400000);
                    this.cookieService.putObject(this._authType.cookieName, this._token, this._cookieOptions);
                    resolve();
                });
            }
            catch (/** @type {?} */ e) {
                reject(e);
            }
        });
    }
    /**
     * @param {?} container
     * @param {?} refreshToken
     * @return {?}
     */
    auth(container, refreshToken) {
        let /** @type {?} */ isCxnUrl = this._authType.cxnUrl !== null;
        if (isCxnUrl) {
            this._windowMessageListener = this._renderer.listen(window, 'message', e => this.recievedMessage(e, refreshToken));
            switch (this.peAuthTypeFactory.connectBy) {
                case 'iframe':
                    //remove iframe if exists in DOM
                    const /** @type {?} */ parentNode = this.getIframeParentNode();
                    if (parentNode)
                        this._renderer.removeChild(parentNode, this._iframe);
                    //Construct new iframe
                    this._iframe = this._renderer.createElement('iframe');
                    this._renderer.setAttribute(this._iframe, 'class', 'pe-auth');
                    this._renderer.setAttribute(this._iframe, 'src', this._authType.cxnUrl);
                    this._iframeLoadListener = this._renderer.listen(this._iframe, 'load', this.iframeLoaded);
                    //fix stylesheets
                    const /** @type {?} */ encapsulationAttr = getEncapsulationAttr(container);
                    if (encapsulationAttr !== null)
                        this._renderer.setAttribute(this._iframe, encapsulationAttr, '');
                    this._renderer.appendChild(container, this._iframe);
                    break;
                case 'window':
                    this._iframe = window.open(this._authType.cxnUrl, "authWin");
                    break;
                default:
                    this.stopListening();
                    break;
            }
        }
        this.ngZone.run(() => {
            if (!isCxnUrl) {
                setTimeout(() => {
                    this._status = PeAuthService.CXN_ECHEC;
                    this._subject.next({ status: this._status, token: this._token, refreshToken: refreshToken, attempt: this._nbAttempt });
                }, 0);
            }
        });
    }
    /**
     * @return {?}
     */
    authByCookie() {
        const /** @type {?} */ cookie = this.cookieService.getObject(this._authType.cookieName);
        if (cookie) {
            try {
                const /** @type {?} */ token = this._authType.getTokenFromCookie(cookie);
                if (!this._authType.isValidToken(token, this._time))
                    throw 'Invalid authent.';
                this.ngZone.run(() => {
                    this._status = PeAuthService.CXN_SUCCESS;
                    this._token = token;
                    this.afterCxn(this._token, this._status, false);
                });
                return true;
            }
            catch (/** @type {?} */ e) {
                this.cookieService.remove(this._authType.cookieName, this._cookieOptions);
            }
        }
        return false;
    }
}
PeAuthService.ɵfac = function PeAuthService_Factory(t) { return new (t || PeAuthService)(ɵngcc0.ɵɵinject(PeAuthTypeFactory), ɵngcc0.ɵɵinject(ɵngcc3.CookieService), ɵngcc0.ɵɵinject(ɵngcc0.RendererFactory2), ɵngcc0.ɵɵinject(ɵngcc0.NgZone)); };
PeAuthService.ɵprov = /*@__PURE__*/ ɵngcc0.ɵɵdefineInjectable({ token: PeAuthService, factory: PeAuthService.ɵfac });
PeAuthService.CXN_OFF = "off";
PeAuthService.CXN_PROGRESS = "progress";
PeAuthService.CXN_ECHEC = "echec";
PeAuthService.CXN_MAX_RETRY = "max-retry";
PeAuthService.CXN_SUCCESS = "success";
/** @nocollapse */
PeAuthService.ctorParameters = () => [
    { type: PeAuthTypeFactory, },
    { type: CookieService, },
    { type: RendererFactory2, },
    { type: NgZone, },
];
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(PeAuthService, [{
        type: Injectable
    }], function () { return [{ type: PeAuthTypeFactory }, { type: ɵngcc3.CookieService }, { type: ɵngcc0.RendererFactory2 }, { type: ɵngcc0.NgZone }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PeInterceptService {
    constructor() {
        this.secureRoute = null;
        this.clear = (e) => {
            this.secureRoute = null;
        };
    }
}
PeInterceptService.ɵfac = function PeInterceptService_Factory(t) { return new (t || PeInterceptService)(); };
PeInterceptService.ɵprov = /*@__PURE__*/ ɵngcc0.ɵɵdefineInjectable({ token: PeInterceptService, factory: PeInterceptService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(PeInterceptService, [{
        type: Injectable
    }], function () { return []; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PeAuthGuardService {
    /**
     * @param {?} router
     * @param {?} peAuthService
     * @param {?} peInterceptService
     */
    constructor(router, peAuthService, peInterceptService) {
        this.router = router;
        this.peAuthService = peAuthService;
        this.peInterceptService = peInterceptService;
        router.events.subscribe(e => {
            if (e instanceof NavigationEnd)
                this.peInterceptService.clear(e);
        });
    }
    /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    canActivate(route, state) {
        if (!this.peAuthService.isConnected()) {
            this.peInterceptService.secureRoute = state;
            let /** @type {?} */ opts = {};
            if (route)
                opts.queryParams = route.queryParams;
            this.router.navigate(this.peAuthService.loginRoute, opts).catch(this.peInterceptService.clear);
            return false;
        }
        return true;
    }
}
PeAuthGuardService.ɵfac = function PeAuthGuardService_Factory(t) { return new (t || PeAuthGuardService)(ɵngcc0.ɵɵinject(ɵngcc4.Router), ɵngcc0.ɵɵinject(PeAuthService), ɵngcc0.ɵɵinject(PeInterceptService)); };
PeAuthGuardService.ɵprov = /*@__PURE__*/ ɵngcc0.ɵɵdefineInjectable({ token: PeAuthGuardService, factory: PeAuthGuardService.ɵfac });
/** @nocollapse */
PeAuthGuardService.ctorParameters = () => [
    { type: Router, },
    { type: PeAuthService, },
    { type: PeInterceptService, },
];
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(PeAuthGuardService, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc4.Router }, { type: PeAuthService }, { type: PeInterceptService }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PeAuthInterceptor {
    /**
     * @param {?} injector
     * @param {?} router
     * @param {?} peAuthGuardService
     */
    constructor(injector, router, peAuthGuardService) {
        this.injector = injector;
        this.router = router;
        this.peAuthGuardService = peAuthGuardService;
        this.connexionInProgress = false;
        this.waitingToken = null;
        this.peAuthService = this.injector.get(PeAuthService);
        this.peAuthService.getStatus().subscribe((subject) => {
            this.connexionInProgress = subject.status === PeAuthService.CXN_PROGRESS;
            if (this.connexionInProgress && this.waitingToken === null) {
                this.waitingToken = new Subject();
            }
            else if (this.waitingToken !== null) {
                this.waitingToken.next(subject.status);
                if (subject.status === PeAuthService.CXN_SUCCESS || subject.status === PeAuthService.CXN_MAX_RETRY) {
                    this.waitingToken.complete();
                    this.waitingToken = null;
                }
            }
        });
    }
    /**
     * @param {?} request
     * @return {?}
     */
    addRequestHeader(request) {
        const /** @type {?} */ options = {
            setHeaders: {
                Authorization: this.peAuthService.authorizationHeader
            }
        };
        if (this.peAuthService.type === PeAuthTypeFactory.AUTH_PEAM) {
            options.setHeaders["typeAuth"] = '/' + this.peAuthService.mode;
        }
        return request.clone(options);
    }
    /**
     * @param {?} request
     * @param {?} next
     * @return {?}
     */
    intercept(request, next) {
        if (this.peAuthService.isConnected()) {
            request = this.addRequestHeader(request);
        }
        return new Observable(subscriber => {
            next.handle(request).subscribe(value => {
                subscriber.next(value);
            }, error => {
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    if (this.peAuthService.isConnected()) {
                        subscriber.error(error);
                    }
                    else {
                        if (!this.connexionInProgress) {
                            this.peAuthService.refreshToken();
                        }
                        this.waitingToken.subscribe(status => {
                            if (status === PeAuthService.CXN_SUCCESS) {
                                this.intercept(request, next).subscribe(value => {
                                    subscriber.next(value);
                                }, error => {
                                    subscriber.error(error);
                                }, () => {
                                    subscriber.complete();
                                });
                            }
                            else if (status === PeAuthService.CXN_MAX_RETRY) {
                                setTimeout(() => {
                                    this.peAuthGuardService.canActivate(null, this.router.routerState.snapshot);
                                }, 0);
                                subscriber.error("Max refresh retry attempt reached.");
                            }
                            else if (!this.connexionInProgress) {
                                this.peAuthService.refreshToken();
                            }
                        });
                    }
                }
                else {
                    subscriber.error(error);
                }
            }, () => {
                subscriber.complete();
            });
        });
    }
}
PeAuthInterceptor.ɵfac = function PeAuthInterceptor_Factory(t) { return new (t || PeAuthInterceptor)(ɵngcc0.ɵɵinject(ɵngcc0.Injector), ɵngcc0.ɵɵinject(ɵngcc4.Router), ɵngcc0.ɵɵinject(PeAuthGuardService)); };
PeAuthInterceptor.ɵprov = /*@__PURE__*/ ɵngcc0.ɵɵdefineInjectable({ token: PeAuthInterceptor, factory: PeAuthInterceptor.ɵfac });
/** @nocollapse */
PeAuthInterceptor.ctorParameters = () => [
    { type: Injector, },
    { type: Router, },
    { type: PeAuthGuardService, },
];
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(PeAuthInterceptor, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc0.Injector }, { type: ɵngcc4.Router }, { type: PeAuthGuardService }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PeAuthComponent {
    /**
     * @param {?} router
     * @param {?} peAuthService
     * @param {?} peInterceptService
     * @param {?} element
     */
    constructor(router, peAuthService, peInterceptService, element) {
        this.router = router;
        this.peAuthService = peAuthService;
        this.peInterceptService = peInterceptService;
        this.element = element;
        this._secureRoute = this.peInterceptService.secureRoute;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.onConnect)
            this.peAuthService.on("connect", this.onConnect);
        this._connect = this.peAuthService.connect(this.type, this.mode, this.element.nativeElement).subscribe((data) => {
            switch (data.status) {
                case PeAuthService.CXN_SUCCESS:
                    if (this._secureRoute === null) {
                        this.router.navigate(this.defaultRoute ? this.defaultRoute : ['']);
                    }
                    else {
                        this.router.navigateByUrl(this._secureRoute.url);
                    }
                    break;
                case PeAuthService.CXN_ECHEC:
                    if (this.errorRoute)
                        this.router.navigate(this.errorRoute);
                    break;
                case PeAuthService.CXN_MAX_RETRY:
                    if (this.maxRetryRoute || this.errorRoute)
                        this.router.navigate(this.maxRetryRoute ? this.maxRetryRoute : this.errorRoute);
                    break;
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._connect.unsubscribe();
    }
}
PeAuthComponent.ɵfac = function PeAuthComponent_Factory(t) { return new (t || PeAuthComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc4.Router), ɵngcc0.ɵɵdirectiveInject(PeAuthService), ɵngcc0.ɵɵdirectiveInject(PeInterceptService), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef)); };
PeAuthComponent.ɵcmp = /*@__PURE__*/ ɵngcc0.ɵɵdefineComponent({ type: PeAuthComponent, selectors: [["pe-auth"]], inputs: { type: "type", mode: "mode", defaultRoute: "defaultRoute", errorRoute: "errorRoute", maxRetryRoute: "maxRetryRoute", onConnect: "onConnect" }, decls: 0, vars: 0, template: function PeAuthComponent_Template(rf, ctx) { }, encapsulation: 2 });
/** @nocollapse */
PeAuthComponent.ctorParameters = () => [
    { type: Router, },
    { type: PeAuthService, },
    { type: PeInterceptService, },
    { type: ElementRef, },
];
PeAuthComponent.propDecorators = {
    "type": [{ type: Input },],
    "mode": [{ type: Input },],
    "defaultRoute": [{ type: Input },],
    "errorRoute": [{ type: Input },],
    "maxRetryRoute": [{ type: Input },],
    "onConnect": [{ type: Input },],
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(PeAuthComponent, [{
        type: Component,
        args: [{
                selector: 'pe-auth',
                template: ''
            }]
    }], function () { return [{ type: ɵngcc4.Router }, { type: PeAuthService }, { type: PeInterceptService }, { type: ɵngcc0.ElementRef }]; }, { type: [{
            type: Input
        }], mode: [{
            type: Input
        }], defaultRoute: [{
            type: Input
        }], errorRoute: [{
            type: Input
        }], maxRetryRoute: [{
            type: Input
        }], onConnect: [{
            type: Input
        }] }); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PeAuthModule {
    /**
     * @param {?=} options
     * @return {?}
     */
    static forRoot(options = {}) {
        return {
            ngModule: PeAuthModule,
            providers: [
                PeInterceptService,
                PeAuthTypeFactory,
                PeAuthService,
                PeAuthGuardService,
                { provide: HTTP_INTERCEPTORS, useClass: PeAuthInterceptor, multi: true },
                { provide: AUTH_OPTIONS, useValue: options }
            ],
        };
    }
}
PeAuthModule.ɵfac = function PeAuthModule_Factory(t) { return new (t || PeAuthModule)(); };
PeAuthModule.ɵmod = /*@__PURE__*/ ɵngcc0.ɵɵdefineNgModule({ type: PeAuthModule });
PeAuthModule.ɵinj = /*@__PURE__*/ ɵngcc0.ɵɵdefineInjector({ imports: [CookieModule.forRoot(),
        HttpClientModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(PeAuthModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CookieModule.forRoot(),
                    HttpClientModule
                ],
                declarations: [
                    PeAuthComponent
                ],
                exports: [
                    PeAuthComponent
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(PeAuthModule, { declarations: function () { return [PeAuthComponent]; }, imports: function () { return [ɵngcc3.CookieModule, HttpClientModule]; }, exports: function () { return [PeAuthComponent]; } }); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { AUTH_OPTIONS, PeAuthModule, PeAuthTypeFactory, PeAuthService, PeInterceptService, PeAuthGuardService, PeAuthComponent, PeAuthInterceptor, OpenAMType, WebSSOType, KitSSOType, NetEntrepriseType };

//# sourceMappingURL=pe-commons-authent.js.map