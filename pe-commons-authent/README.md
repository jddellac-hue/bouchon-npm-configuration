    # PE Angular Commons - Module d'authentification

## Description

Ce module permet de mettre en place l'authentification aux différents systèmes (WebSSO, OpenAM) pour des royaumes utilisateurs divers (Agent, Individu, Employeur, Partenaire) pour une application en Angular.

Ce module est actuellement en Angular 5.

## Objectif

Avoir un seul module pour unifier les pratiques et augmenter la rapidité et la fiabilité des développements ainsi que la sécurité.

## NOTE SLDNG: 
- Pour les versions 2.6.0 à 2.9.2, sur une connexion de type openAM agent, un intercepteur est à prévoir en plus de la librairie pour tranformer le header en ajoutant "agento":
"Bearer {token}" devient "Bearer agento{token}.
- Il est vivement conseillé de prévoir une montée de version SLDGN supérieur ou égal à 2.9.3 pour ne pas avoir à faire l'ajout d'un intercepteur spécifique à ces versions.

## Version 1.2.0
- Ajout du type d'authentification FLOW_AUTHORIZATION_CODE_WITH_PKCE
- Changement sur l'option accessTokenUrl et l'ajout de l'option externalAccessTokenUrl pour le type FLOW_AUTHORIZATION_CODE et FLOW_AUTHORIZATION_CODE_WITH_PKCE
- Ajout d'une dépendance au module crypto-js

## Version 1.1.9
- Fix de la gestion d'événement sur le onConnect pour une connexion OpenAM FLOW_AUTHORIZATION_CODE
- Ajout de la configuration de la durée de validité du token pour les connexions kitSSO et webSSO

## Version 1.1.8
- Assure la compatibilité Angular 10
- Suppression du support rxjs-compat

## Version 1.1.7
- Optimisation de l'intercepteur (suppression des appels façade en rejeux d'authentification)
- Correctif sur le flag du nombre de tentative de connexion
- Ajustement du contenu du status

## Version 1.1.6
- Ajout de la fonctionnalité OnConnect: permet d'effectuer une opération async avant le retour de connexion CXN_SUCCESS
- Ajout du cadre dans les options (Cette option est obligatoire)
- Ajout de l'option maxRetry: optimisation du nombre d'appel vers les servers d'authentification (par défaut 5);
- Optimisation de la gestion de reconnexion (Une nouvelle tentative toute les 500ms).
- Modification du nom des Cookies via l'ajout du préfix "{cadre}_".

## Version 1.1.5

- Fix sur l'appel de multiple service dans l'intercepteur

## Version 1.1.4

- Ajout de la connexion kitSSO

Connexion pour l'authentification via le Kit SSO Peam(A) 

- Ajout de l'option connectBy 'iframe' | 'window': defaut 'iframe'

Option de choix pour une autentification dans une fenêtre externe ou dans une iframe.


**ATTENTION :** mettre à jour le auth.html

```html
<!DOCTYPE html>
<html>
  <head><script>(window.parent === window ? window.opener : window.parent).postMessage(document.location.href, document.location.origin);</script></head>
  <body></body>
</html>
```

## Installation

```sh
npm install --save @pe-commons/authent
```

## Installation locale

Ce projet est basé sur @angular/compiler-cli et ng-pakagr. 
Afin de générer la librairie Angular ainsi que la genération du script "dummy", il suffit d'utiliser les commandes:

```sh
git clone ssh://git@git-scm.pole-emploi.intra:2222/angular-communs/pe-auth-libangular.git

cd pe-auth-angular

npm run build
```

La distribution sera placé dans le dossier **dist** et un pakage **dist.tgz** sera présent à la racine du projet.

## Utilisation

### Intégration dans une application

Dans le fichier app.modules.ts

```javascript
import { PeAuthModule, OpenAMType } from '@pe-commons/authent';
import { AppRoutes } from "./app.routes";
 
@NgModule({
  imports: [
    RouterModule.forRoot(AppRoutes),
    PeAuthModule.forRoot({
      webSSO: {
        agent: {
          cadre: "r",
          webSSOUrl: "https://wbsso-vipa-01vt014.sii24.pole-emploi.intra/pe-sp/index",
          tokenValidityDuration: 12
        }
      },
      kitSSO: {
        agent: {
          kitSSOUrl: "..."
        }
      },
      netEntreprise: {
        partenaire: {
          netEntrepriseUrl: "..."
        }
      },
      openAM: {
        individu: {
          cadre: "r",
          openAMUrl: "https://authentification-candidat.pole-emploi.fr",
          accessTokenFlow: OpenAMType.FLOW_AUTHORIZATION_CODE,
          clientId: "*your_client_id*",
          authorizeResource: {
            url: "/connexion/oauth2/authorize",
            scope: "openid profile email ...",
            responseType: "code",
            accessTokenUrl: "/connexion/oauth2/realms/root/realms/individu/accessToken"
          },
	      logoutResource: {
            urlOIDC: "",
            urlOpenAM: "/compte/deconnexion"
          }
        }
      },
      redirectUrl: "/auth/auth.html",
      loginRoute: ['login']
    }),
    ...
  ],
  ...
})
```

Dans le fichier app.routes.ts

```javascript
import { Routes, CanActivate } from '@angular/router';
import { PeAuthGuardService as AuthGuard } from '@pe-commons/authent';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { SomeComponent } from './components/some/some.component';

...

export const AppRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'some', component: SomeComponent, canActivate: [AuthGuard] },
  ...
  { path: '**', redirectTo: '' }
];
```

Dans le fichier login.component.ts

```javascript
import { Component } from '@angular/core';
import { PeAuthTypeFactory, OnConnect } from '@pe-commons/authent';
import * as jwtDecode from 'jwt-decode';
import { of } from 'rxjs/observable/of';

@Component({
  template: '<pe-auth [type]="type" [mode]="mode" [defaultRoute]="defaultRoute" [errorRoute]="errorRoute" [onConnect]="onConnect"></pe-auth>',
  styleUrls: ['login.style.css']
})
export class LoginCompoent implements OnConnect { 
    
    type = PeAuthTypeFactory.AUTH_PEAM;
    mode = PeAuthTypeFactory.MODE_INDIVIDU;
    defaultRoute = [''];
    errorRoute = ['error'];
  
    onConnect = (token: string, refreshToken: boolean, attempt: number) => {
      
      // affichage du token JWT via la librairie jwt-decode (npm i jwt-decode)
      // pour une connection openAM avec pour responseType: "token id_token"
      console.log(jwtDecode(token['id_token']));

      // possibilité de retourné une Promise ou un Observable ou un boolean
      return of(true);
	  }
}
```

Dans le fichier login.style.css

```css
.pe-auth, .pe-auth-login {
    z-index: 9999;
    position: absolute;
    top: -100%;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
    border: none;
}
.pe-auth-login {
    top: 0;
    display: block;
}
```

Création du fichier auth.html à la racine du projet dans un dossier "auth" comme les assests.

```html
<!DOCTYPE html>
<html>
  <head><script>(window.parent === window ? window.opener : window.parent).postMessage(document.location.href, document.location.origin);</script></head>
  <body></body>
</html>
```



## Angular-cli

Si vous utilisé angular-cli, mettre à jour les assets pour prendre en compte la page auth.html

```javascript
...
"assets": [
  "assets",
    ...
  "favicon.ico",
  "auth"
],
```

## Style de l'iframe

Lors l'ouverture de la connection l'iframe est créée avec la class **.pe-auth**.
si l'autentification nécessite une action de la pars de l'utilisateur (saisie login/password), la class de l'iframe devient alors **.pe-auth-login**


## Classes et interfaces disponibles

### PeAuthModule

```javascript
class PeAuthModule {

    //Permet de créer le module avec toutes les options d'authentification définie dans la classe **PeAuthOptions**.
    static forRoot(options: PeAuthOptions = {}): ModuleWithProviders
}
```
### PeAuthOptions

```javascript
interface PeAuthOptions {
  webSSO?: {
    agent?: WebSSOOptions
  },
  kitSSO?: {
    agent?: KitSSOOptions
  },
  netEntreprise: {
    partenaire?: NetEntrepriseOptions
  },
  openAM?: {
    agent?: OpenAMOptions,
    individu?: OpenAMOptions,
    employeur?: OpenAMOptions,
    partenaire?: OpenAMOptions
  },
  redirectUrl?: string // l'uri de redirection après connexion. Important: c'est une url relative! La redirection se fait vers une page du domaine.
  loginRoute?: any[] // la route du login. Se référer à la définition angular de Router.navigate(). Utilisé par PeAuthGuardService
  connectBy?: 'iframe' | 'window' //permet de choisir si l'authentification se fait via une iframe ou dans une nouvelle fenêtre
  maxRetry?: number //permet de définir le nombre de tentative de connexion (par défaut 5). Chaque tentative est espacée de 500ms.
}
```
### WebSSOOptions

Connexion via le kit webSSO classic

```javascript
interface WebSSOOptions {
  cadre: string // cadre de livraison
  tokenValidityDuration?: number // duréé de validité du token en heure (24 si non déclaré)
  webSSOUrl: string // l'url de connexion
}
```

### KitSSOOptions

Connexion via le kit webSSO de PEAM 

```javascript
interface KitSSOOptions {
  cadre: string // cadre de livraison
  tokenValidityDuration?: number // duréé de validité du token en heure (24 si non déclaré)
  kitSSOUrl: string // l'url de connexion
}
```

### NetEntrepriseOptions

Connexion via netEntreprise 

```javascript
interface NetEntrepriseOptions {
  cadre: string // cadre de livraison
  netEntrepriseUrl: string // l'url de connexion
}
```

### OpenAMOptions

Connexion OIDC de PEAM 

```javascript
interface OpenAMOptions {
  cadre: string // cadre de livraison
  openAMUrl: string, // l'url de connexion
  clientId: string, // l'identifiant client
  accessTokenFlow: string, // la strategie d'accès au token
  authorizeResource: {
    url: string, // uri du endpoint authorize
    scope: string, // scope de l'open id
    responseType: string, // reponse souhaité (token / token_id)
    accessTokenUrl?: string, // uri d'accès au token.
    externalAccessTokenUrl?: string, // uri d'accès au token.
  },
  logoutResource: {
    urlOIDC: string, // uri du endpoint de l'OIDC
    urlOpenAM: string // uri du endpoint OpenAm
  }
}
```

### PeAuthService

```javascript
class PeAuthService {
  
  //status de la connexion
  static CXN_OFF: string;
  static CXN_PROGRESS: string;
  static CXN_ECHEC: string;
  static CXN_MAX_RETRY: string;
  static CXN_SUCCESS: string;
  
  constructor(private peAuthTypeFactory:PeAuthTypeFactory, private cookieService: CookieService, private rendererFactory: RendererFactory2, private ngZone: NgZone);

  // retourne le header **Authorization** généré.
  get authorizationHeader: string;

  // retourne la route du login définie dans les options.
  get loginRoute: any[];

  // retourne l'état de la connexion.
  get status: string;

  // retourne le mode d'authentification utilisé
  get mode: string;

  // retourne le type d'authentification utilisé
  get type: string;

  // retourne un observable dont le contenu est définie par **PeAuthSubject**.
  // **type** - le type d'authentification
  // **mode** - le mode d'autentification
  // **container** - l'HtmlElement ou sera placé l'iframe de connexion. (document.body si vide) 
  connect(type: string, mode: string, container?: HTMLElement | document.body): Observable<PeAuthSubject>;
  
  // retourne un observable dont le contenu est définie par **PeAuthSubject**.
  // **container** - l'HtmlElement ou sera placé l'iframe de connexion. (document.body si vide)
  // renvoie une exception si aucune connexion n'a été lancé.
  refreshToken(container?: HTMLElement | document.body): Observable<PeAuthSubject>;

  // retourne vrai si le token est présent et valide et faux sinon.
  isConnected(): boolean;

  // retourne l'état de la connexion via un observable dont le contenu est définie par **PeAuthSubject**.
  getStatus(): Observable<PeAuthSubject>;

  // déconnecte l'utilisateur
  // retourne un observable dont le contenu est définie par **PeAuthSubject**.
  logout(): Observable<PeAuthSubject>;

}
```

### PeAuthTypeFactory

```javascript
class PeAuthTypeFactory {
  
  //mode d'authentification
  static MODE_AGENT: string;
  static MODE_EMPLOYEUR: string;
  static MODE_INDIVIDU: string;
  static MODE_PARTENAIRE: string;
  
  //type d'authentification
  static AUTH_WEBSSO: string;
  static AUTH_KITSSO: string;
  static AUTH_NET_ENTREPRISE: string;
  static AUTH_PEAM: string;

  constructor(options: PeAuthOptions, http: HttpClient, locationStrategy: LocationStrategy);
  
  // retourne l'url de redirection définie dans les options
  get redirectUrl: string;

  // retourne la route du login définie dans les options.
  get loginRoute: any[];

  // retourne l'option connectBy définie dans les options (par défaut 'iframe').
  get connectBy?: string;

  // retourne le nombre de tentative de connexion (par dédfaut 5).
  get maxRetry?: number;
  
  // retourne le type d'authentification en fonction du mode et du type de connextion.
  // renvoie une exception si le type et/ou le mode associé n'est pas supporté.
  getPeAuthType(type: string, mode: string): WebSSOType | OpenAMType;
  
}
```

### PeAuthSubject

```javascript
interface interface PeAuthSubject {
  status: string, // le status de la connexion
  token: string // le token
  refreshToken: boolean // flag de notification d'un raffraichissement de token
  attempt: number // nombre de tentative de d'authentification
}
```

### PeAuthGuardService

```javascript
class PeAuthGuardService implements CanActivate {
  constructor(router: Router, peAuthService: PeAuthService);
  
  //retourne vrai si la route est sécurisée
  canActivate(route: ActivatedRouteSnapshot): boolean;
}
```

###  PeAuthComponent

**selector** : "pe-auth" 

```javascript
class PeAuthComponent implements OnInit {
    @Input() type: string;
    @Input() mode: string;
    @Input() defaultRoute: any[];
    @Input() errorRoute: any[];
    @Input() maxRetryRoute: any[];
    @Input() onConnect: (token: string, refreshToken: boolean) => Observable<boolean> | Promise<boolean> | boolean;

    constructor(router: Router, peAuthService: PeAuthService, element: ElementRef);

    ngOnInit(): void;
    ngOnDestroy(): void;
```

#### exemple d'utilisation
```html
<pe-auth [type]="type" [mode]="mode" [defaultRoute]="defaultRoute" [errorRoute]="errorRoute" [onConnect]="onConnect"></pe-auth>
```

### PeAuthInterceptor

L'intercepteur ajoute les headers suivants:

| Type de connexion | Mode de connexion | Header Authorization | Header typeAuth | Server d'authentification |
| --- | --- | --- | --- | --- |
| AUTH_WEBSSO | MODE_AGENT | Authorization : Bearer agent{token} | | webSSO, protocol kit |
| AUTH_KITSSO | MODE_AGENT | Authorization : Bearer agent{token} | | peamA, protocol kit |
| AUTH_NET_ENTREPRISE | MODE_PARTENAIRE | Authorization : Bearer partenaire{token} | | |
| AUTH_PEAM | MODE_AGENT | Authorization : Bearer {token} | typeAuth : /agent | peamA, population agents, protocol OIDC |
| AUTH_PEAM | MODE_EMPLOYEUR | Authorization : Bearer {token} | typeAuth : /employeur | peamE, population recruteurs, protocol OIDC |
| AUTH_PEAM | MODE_INDIVIDU | Authorization : Bearer {token} | typeAuth : /individu | peamU, population DE/candidats, protocol OIDC |
| AUTH_PEAM | MODE_PARTENAIRE | Authorization : Bearer {token} | typeAuth : /partenaire | peamE, population ESD, protocol OIDC |


```javascript
class PeAuthInterceptor implements HttpInterceptor {
  constructor(injector: Injector);
  
  //interception des requêtes via le module HttpClientModule
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}
```

## Connexion Net Entreprise

L'utilisation du composant Login n'est pas nécéssaire.

Dans le fichier app.component.ts

```javascript
@Component({...})
export class AppComponent {
  constructor(... private authService: PeAuthService) {
        this.authService.connect(PeAuthTypeFactory.AUTH_NET_ENTREPRISE, PeAuthTypeFactory.MODE_PARTENAIRE).subscribe( (data: PeAuthSubject) => {
          if (this._status === PeAuthService.CXN_SUCCESS) {
            ...
          } else {
            ...
          }
        });
    }
}
```

## Gestion des cookies

| Type de connexion | Mode de connexion | Nom du cookie | Paricularité |
| --- | --- | --- | --- |
| AUTH_WEBSSO | MODE_AGENT | {cadre}_userToken | Cookie inter PN |
| AUTH_KITSSO | MODE_AGENT | {cadre}_userTokenA | Cookie inter PN |
| AUTH_NET_ENTREPRISE | MODE_PARTENAIRE | {cadre}_netToken | ... |
| AUTH_PEAM | MODE_AGENT | {cadre}_userBadgeA | Cookie propre à chaque clientId (en principe chaque PN) |
| AUTH_PEAM | MODE_EMPLOYEUR | {cadre}_userBadgeE | Cookie propre à chaque clientId (en principe chaque PN) |
| AUTH_PEAM | MODE_INDIVIDU | {cadre}_userBadgeI | Cookie propre à chaque clientId (en principe chaque PN) |
| AUTH_PEAM | MODE_PARTENAIRE | {cadre}_userBadgeP | Cookie propre à chaque clientId (en principe chaque PN) |

Les cookies sont déposés pour le domaine du PN qui est détecté automatiquement:
ex: mon-site.mon-domaine.fr => cookie valable pour le domaine mon-domaine.fr

## SameSite Google Evolution

Afin de palier au problème de cookie lié au cross-site, l'option connectBy = 'window' permet d'ouvrir l'authentification dans une nouvelle fenêtre.

```javascript
PeAuthModule.forRoot({
  kitSSO: {
    agent: {
      cadre: "TIC",
      kitSSOUrl: "..."
    }
  },
  ...
  redirectUrl: "/auth/auth.html",
  loginRoute: ['login'],
  connectBy: 'window'
})
```

**ATTENTION :** Pour les projets déjà en place mettre à jour le fichier "auth.html".