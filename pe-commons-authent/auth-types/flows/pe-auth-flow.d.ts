/**
 * @name PeAuthFlow
 * @description
 *
 * Cet object contient les propriétés définissables en fonction du type de flow d'authentification.
 *
 * Cet object peut contenir les propriétés suivantes
 *
 * - **getTokenFromUrl** - {(msg: any) => any} - méthode pour extraire le token du message reçu via une url.
 * - **isValidToken** - {(token:any) => boolean} - méthode de validation du token.
 */
export interface PeAuthFlow {
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
     * - **state** - {string} - variable de vérification de connexion
     * - **nonce** - {string} - variable de vérification de connexion
     */
    isValidToken: (token: any, time: number, state: string, nonce: string) => boolean;
}
