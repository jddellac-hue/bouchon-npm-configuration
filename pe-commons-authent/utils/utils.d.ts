/**
 * @name searchParams
 * @description
 *
 * Cet méthode permet de récupérer les paramètres d'une url.
 *
 * Si un object d'exemple est présent, seul les paramètres qui seront présents
 * en clé dans l'object d'exemple seront récupérés.
 *
 * - **url** - {string} - l'url analysée.
 * - **inner** - {any} - object exemple.
 */
export declare function searchParams(url: string, inner?: any): any;
/**
 * @name fixEncapsulationAttr
 * @description
 *
 * Cet méthode permet de récupérer l'attribut d'encapsulation du style d'un élément HTML.
 * retourne null si aucun attribut d'encapsulation n'est trouvé.
 *
 * - **el** - {HTMLElement} - l'element analysé.
 */
export declare function getEncapsulationAttr(el: HTMLElement): string;
