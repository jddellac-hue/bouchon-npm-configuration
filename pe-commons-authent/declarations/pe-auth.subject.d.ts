/**
 * @name PeAuthSubject
 * @description
 *
 * Cet object contient les propriétés du retour d'authentification.
 *
 * Cet object peut contenir les propriétés suivantes
 *
 * - **status** - {string} - le status de la connexion.
 * - **token** - {any} - le token d'authentification.
 * - **refreshToken** - {boolean} - flag qui permet de savoir si la tentative d'authentification est pour un raffraichissement du token.
 * - **attempt** - {number} - le nombre de tentative d'authentification.
 */
export interface PeAuthSubject {
    status?: string;
    token?: any;
    refreshToken?: boolean;
    attempt?: number;
}
