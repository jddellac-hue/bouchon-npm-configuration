/**
 * @name PeAuthType
 * @description
 *
 * Cet object contient les propriétés définissables en fonction du type d'authentification.
 *
 * Cet object peut contenir les propriétés suivantes
 *
 * - **cxnUrl** - {string} - l'url de connexion.
 * - **cookieName** - {string} - le nom du cookie.
 * - **getTokenFromCookie** - {(cookie: any) => any} - méthode pour extraire le token du cookie.
 * - **getTokenFromUrl** - {(msg: any) => any} - méthode pour extraire le token du message reçu via une url.
 * - **isValidToken** - {(token:any) => boolean} - méthode de validation du token.
 */
export interface PeAuthType {
    /**
     * Promise pour attendre que le type d'authentification soit prêt (construction d'url, ... async)
     */
    ready: Promise<PeAuthType>;
    /**
     * L'url de connexion pour l'authentification.
     */
    cxnUrl: string;
    /**
     * boolean permettant de relancer automatiquement l'url de connexion en cas d'échec
     */
    autoReload: boolean;
    /**
     * Le nom du cookie.
     */
    cookieName: string;
    /**
     * Méthode de récupération du token à partir du cookie.
     *
     * - **cookie** - {any} - le cookie.
     */
    getTokenFromCookie: (cookie: any) => any;
    /**
     * Méthode de récupération du token à partir d'une url.
     *
     * - **url** - {string} - l'url.
     * - **callback** - {(token:any) => void} - méthode appelée post récupération de token.
     */
    getTokenFromUrl: (url: string, callback: (token: any) => void) => void;
    /**
     * Méthode de validation du token.
     *
     * - **token** - {any} - le token.
     * - **time** - {any} - la date de connexion.
     */
    isValidToken: (token: any, time: number) => boolean;
    /**
     * Méthode de construction du header **Authorization**.
     *
     * - **token** - {any} - le token.
     * - **mode** - {string} - le mode d'authentification.
     */
    buildAuthorization: (token: any, mode: string) => string;
    /**
     * Méthode déconnexion.
     *
     * - **token** - {any} - le token.
     * - **callback** - {() => void} - méthode appelée post déconnexion.
     */
    logout: (token: any, callback: () => void) => void;
}
